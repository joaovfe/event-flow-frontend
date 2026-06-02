import { useState } from 'react';
import { Stack, Paper, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Link as LinkRouter,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { EUnauthenticatedPath } from '@/core/router';
import {
  callbackOnInvalidZod,
  formatErrorForNotification,
} from '@/shared/utils';
import { LoadingButton, ControlledPassword } from '@shared/components';
import {
  UnauthenticatedContentAlert,
  IUnauthenticatedContentAlert,
  UnauthenticatedContentHeader,
} from '@/shared/layout';

import { ResetData, resetSchema } from '../domain';
import { useAuth } from '../hooks';

export function Reset() {
  const { reset, loading } = useAuth();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    navigate(EUnauthenticatedPath.LOGIN);
  }

  const [alert, setAlert] = useState<IUnauthenticatedContentAlert>({
    message: '',
    type: 'error',
  });

  const { control, handleSubmit } = useForm<ResetData>({
    defaultValues: {
      token: token as string,
      password: '',
      confirm: '',
    },
    resolver: zodResolver(resetSchema),
  });

  async function handleReset(data: ResetData) {
    try {
      const response = await reset(data);

      setAlert({
        message: response,
        type: 'success',
      });
    } catch (error) {
      setAlert({
        message: formatErrorForNotification(error),
        type: 'error',
      });
    }
  }

  return (
    <Paper
      elevation={3}
      sx={{
        gap: 2,
        padding: 4,
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <UnauthenticatedContentHeader
        title="Recuperação de Senha"
        description="Informe uma nova senha para sua conta e confirme-a."
      />

      <Stack
        component="form"
        onSubmit={handleSubmit(handleReset, callbackOnInvalidZod)}
        gap={2}
      >
        <UnauthenticatedContentAlert
          alert={alert}
          clear={() => setAlert({ message: '', type: 'error' })}
        />

        <ControlledPassword
          label="Nova Senha"
          name="password"
          size="medium"
          control={control}
        />

        <ControlledPassword
          label="Confirme Senha"
          name="confirm"
          size="medium"
          control={control}
        />

        <LoadingButton
          type="submit"
          size="large"
          color="success"
          variant="contained"
          loading={loading}
          disabled={alert.type === 'success'}
          loadingIndicator="SALVANDO..."
        >
          SALVAR
        </LoadingButton>
      </Stack>

      <Link
        color="text.secondary"
        component={LinkRouter}
        to={EUnauthenticatedPath.LOGIN}
      >
        Já possui uma conta? Acesse
      </Link>
    </Paper>
  );
}
