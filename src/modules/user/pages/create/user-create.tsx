import { useState } from 'react';
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
import { EStatus, Loading } from '@/shared/domain';

import { UserCreateData, UserCreateDTO, userCreateSchema } from '../../domain';
import { UserRepository } from '../../repositories';
import { UserForm } from '../../components';

const INITIAL_FORM_DATA: Partial<UserCreateData> = {
  name: '',
  email: '',
  role: undefined,
  status: EStatus.ACTIVE,
  password: '',
  resetPassword: true,
};

export function UserCreate() {
  const navigate = useNavigate();

  const repository = new UserRepository();

  const [loading, setLoading] = useState<Loading>(false);

  const methods = useForm<UserCreateData>({
    defaultValues: INITIAL_FORM_DATA,
    resolver: zodResolver(userCreateSchema),
  });

  async function create(data: UserCreateDTO) {
    if (loading) return;

    try {
      setLoading('POST');

      await repository.create(data);

      toast.success('Novo usuário cadastrado com sucesso!');

      navigate(EAuthenticatedPath.USERS);
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }
  function submit(data: UserCreateData) {
    create({ ...data, roleId: data?.role.id });
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle>Novo Usuário</PageTitle>

        <PageButtons>
          <LoadingButton
            type="submit"
            color="success"
            variant="contained"
            loading={loading === 'POST'}
            loadingIndicator="Criando..."
            onClick={methods.handleSubmit(submit, callbackOnInvalidZod)}
          >
            Salvar Usuário
          </LoadingButton>
        </PageButtons>
      </PageHeader>

      <PageCard>
        <FormProvider {...methods}>
          <UserForm disabled={loading === 'POST'} />
        </FormProvider>
      </PageCard>
    </Page>
  );
}
