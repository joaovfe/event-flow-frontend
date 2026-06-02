import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { EAuthenticatedPath } from '@/core/router';

import { ID, Loading } from '@/shared/domain';
import {
  callbackOnInvalidZod,
  formatErrorForNotification,
} from '@/shared/utils';
import {
  LoadingButton,
  Page,
  PageButtons,
  PageCard,
  PageHeader,
  PageTitle,
  useConfirmDialog,
} from '@shared/components';

import { RoleForm, RoleAbilities } from '../../components';
import { AbilityRepository, RoleRepository } from '../../repositories';
import {
  EAbilityReference,
  RoleUpdateData,
  RoleUpdateDTO,
  roleUpdateSchema,
} from '../../domain';

export function RoleUpdate() {
  const { id } = useParams();
  const { openConfirmDialog } = useConfirmDialog();

  const navigate = useNavigate();

  const roleRepository = new RoleRepository();
  const abilityRepository = new AbilityRepository();

  const [loading, setLoading] = useState<Loading>(false);

  const methods = useForm<RoleUpdateData>({
    defaultValues: {
      name: '',
      abilities: [],
    },
    resolver: zodResolver(roleUpdateSchema),
  });

  function handleGoBack() {
    navigate(EAuthenticatedPath.ROLES);
  }

  function submit(data: RoleUpdateData) {
    const record: RoleUpdateDTO = {
      name: data.name,
      status: data.status,
      reference: data.reference,
      abilities: data.abilities.map((ability) => ({
        ...ability,
        reference: ability.reference as EAbilityReference,
      })),
    };

    id && update(id, record);
  }

  async function handleRemove(id: ID) {
    const confirm = await openConfirmDialog({
      title: 'Deseja excluir o perfil de usuário?',
      description:
        'Você tem certeza que deseja excluir este perfil de usuário? Essa é uma ação irreversível.',
    });

    if (confirm) remove(id);
  }

  async function update(id: ID, data: RoleUpdateDTO) {
    if (loading) return;

    try {
      setLoading('PUT');

      await roleRepository.update(id, data);

      toast.success('Perfil de usuário atualizado com sucesso!');

      handleGoBack();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: ID) {
    if (loading) return;

    try {
      setLoading('DELETE');

      await roleRepository.delete(id);

      toast.success('Perfil de usuário excluido com sucesso!');

      handleGoBack();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  async function get(id: ID) {
    try {
      setLoading('GET');

      const [role, { data: abilities }] = await Promise.all([
        roleRepository.get(id),
        abilityRepository.list({
          pagination: { orderBy: 'name', ordering: 'asc' },
        }),
      ]);

      methods.reset({
        name: role.name,
        reference: role.reference,
        status: role.status,
        abilities: abilities.map((ability) => {
          const roleAbility = role.roleAbilities.find(
            (roleAbility) => roleAbility.ability?.id === ability.id,
          );

          return {
            name: ability.name,
            reference: ability.reference,
            canRead: roleAbility?.canRead ?? false,
            canUpdate: roleAbility?.canUpdate ?? false,
            canCreate: roleAbility?.canCreate ?? false,
            canDelete: roleAbility?.canDelete ?? false,
          };
        }),
      });
    } catch (error) {
      toast.error(formatErrorForNotification(error));
      handleGoBack();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) get(id);
  }, [id]);

  return (
    <Page>
      <PageHeader>
        <PageTitle>Editar Perfil de Usuário</PageTitle>

        <PageButtons flexDirection="row-reverse">
          <LoadingButton
            loading={loading === 'PUT'}
            loadingIndicator="Salvando..."
            variant="contained"
            type="submit"
            color="success"
            size="large"
            onClick={methods.handleSubmit(submit, callbackOnInvalidZod)}
          >
            Salvar Alterações
          </LoadingButton>

          <LoadingButton
            size="large"
            variant="text"
            color="error"
            type="button"
            onClick={() => {
              id && handleRemove(id);
            }}
            loading={loading === 'DELETE'}
            loadingIndicator="Excluindo..."
          >
            Excluir Usuário
          </LoadingButton>
        </PageButtons>
      </PageHeader>

      <PageCard component="form">
        <FormProvider {...methods}>
          <RoleForm disabled={loading === 'PUT'} />

          <RoleAbilities
            loading={loading === 'GET'}
            disabled={loading === 'PUT'}
          />
        </FormProvider>
      </PageCard>
    </Page>
  );
}
