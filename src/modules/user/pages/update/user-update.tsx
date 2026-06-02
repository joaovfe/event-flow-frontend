import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { EAuthenticatedPath } from '@/core/router';

import {
  Page,
  PageButtons,
  PageCard,
  PageHeader,
  PageTitle,
} from '@shared/components/page';
import {
  callbackOnInvalidZod,
  formatErrorForNotification,
} from '@/shared/utils';
import { Loading, LoadingButton, useConfirmDialog } from '@shared/components';
import { ID, Loading as LoadingState } from '@/shared/domain';

import { UserUpdateData, UserUpdateDTO, userUpdateSchema } from '../../domain';
import { UserRepository } from '../../repositories';
import { UserForm } from '../../components';

export function UserUpdate() {
  const { id } = useParams();
  const { openConfirmDialog } = useConfirmDialog();

  const navigate = useNavigate();

  const repository = new UserRepository();

  const [loading, setLoading] = useState<LoadingState>('GET');

  const methods = useForm<UserUpdateData>({
    defaultValues: {},
    resolver: zodResolver(userUpdateSchema),
  });

  function submit(data: UserUpdateData) {
    const record: UserUpdateDTO = {
      name: data.name,
      email: data.email,
      status: data.status,
      roleId: data.role.id,
      resetPassword: data.resetPassword,
    };

    id && update(id, record);
  }

  function goBack() {
    navigate(EAuthenticatedPath.USERS);
  }

  async function handleRemove(userId: ID) {
    const confirm = await openConfirmDialog({
      title: 'Deseja excluir o usuário?',
      description:
        'Você tem certeza que deseja excluir este usuário? Essa é uma ação irreversível.',
    });

    if (confirm) remove(userId);
  }

  async function update(id: ID, data: UserUpdateDTO) {
    if (loading) return;

    try {
      setLoading('PUT');

      await repository.update(id, data);

      toast.success('Usuário atualizado com sucesso!');

      goBack();
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

      await repository.delete(id);

      toast.success('Usuário excluido com sucesso!');

      goBack();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  async function get(userId: ID) {
    try {
      setLoading('GET');

      const user = await repository.get(userId);

      methods.reset({
        ...user,
      });
    } catch (error) {
      toast.error(formatErrorForNotification(error));
      goBack();
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
        <PageTitle>Editar Usuário</PageTitle>

        <PageButtons flexDirection="row-reverse">
          <LoadingButton
            type="submit"
            size="large"
            color="success"
            variant="contained"
            disabled={!!loading}
            loading={loading === 'PUT'}
            loadingIndicator="Salvando..."
            onClick={methods.handleSubmit(submit, callbackOnInvalidZod)}
          >
            Salvar Usuário
          </LoadingButton>

          <LoadingButton
            type="button"
            size="large"
            color="error"
            disabled={!!loading}
            loading={loading === 'DELETE'}
            loadingIndicator="Excluindo..."
            onClick={() => id && handleRemove(id)}
          >
            Excluir Usuário
          </LoadingButton>
        </PageButtons>
      </PageHeader>

      <PageCard>
        {loading === 'GET' && <Loading />}

        {loading !== 'GET' && (
          <FormProvider {...methods}>
            <UserForm disabled={!!loading} withoutPassword />
          </FormProvider>
        )}
      </PageCard>
    </Page>
  );
}
