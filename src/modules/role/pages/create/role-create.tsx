import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { EAuthenticatedPath } from '@/core/router';

import {
  LoadingButton,
  Page,
  PageButtons,
  PageCard,
  PageHeader,
  PageTitle,
} from '@/shared/components';
import {
  callbackOnInvalidZod,
  formatErrorForNotification,
} from '@/shared/utils';

import { AbilityRepository, RoleRepository } from '../../repositories';
import { RoleCreateData, roleCreateSchema } from '../../domain/schemas';
import { RoleCreateDTO, EAbilityReference } from '../../domain';
import { RoleAbilities, RoleForm } from '../../components';

export function RoleCreate() {
  const navigate = useNavigate();

  const roleRepository = new RoleRepository();
  const abilityRepository = new AbilityRepository();

  const [loading, setLoading] = useState<'GET' | 'POST' | 'IDLE'>('IDLE');

  const methods = useForm<RoleCreateData>({
    defaultValues: {
      name: '',
      abilities: [],
    },
    resolver: zodResolver(roleCreateSchema),
  });

  function navigateBack() {
    navigate(EAuthenticatedPath.ROLES);
  }

  async function submit(data: RoleCreateData) {
    const record: RoleCreateDTO = {
      name: data.name,
      status: data.status,
      reference: data.reference,
      abilities: data.abilities.map((ability) => ({
        ...ability,
        reference: ability.reference as EAbilityReference,
      })),
    };

    create(record);
  }

  async function create(data: RoleCreateDTO) {
    if (loading !== 'IDLE') return;

    try {
      setLoading('POST');

      await roleRepository.create(data);

      toast.success('Perfil de usuário cadastrado com sucesso!');

      navigateBack();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading('IDLE');
    }
  }

  async function getAbilities() {
    try {
      setLoading('GET');

      const { data } = await abilityRepository.list({
        pagination: { orderBy: 'name', ordering: 'asc' },
      });

      methods.setValue(
        'abilities',
        data.map(({ name, reference }) => {
          return {
            name,
            reference,
            canCreate: false,
            canDelete: false,
            canUpdate: false,
            canRead: false,
          };
        }),
      );
    } catch (error) {
      toast.error(formatErrorForNotification(error));
      navigateBack();
    } finally {
      setLoading('IDLE');
    }
  }

  useEffect(() => {
    getAbilities();
  }, []);

  return (
    <Page>
      <PageHeader>
        <PageTitle>Novo Perfil de Usuário</PageTitle>

        <PageButtons>
          <LoadingButton
            size="large"
            color="success"
            variant="contained"
            loadingIndicator="Criando..."
            loading={loading === 'POST'}
            onClick={methods.handleSubmit(submit, callbackOnInvalidZod)}
          >
            Criar Perfil de Usuário
          </LoadingButton>
        </PageButtons>
      </PageHeader>

      <PageCard component="form">
        <FormProvider {...methods}>
          <RoleForm disabled={loading === 'POST'} />

          <RoleAbilities
            loading={loading === 'GET'}
            disabled={loading === 'POST'}
          />
        </FormProvider>
      </PageCard>
    </Page>
  );
}
