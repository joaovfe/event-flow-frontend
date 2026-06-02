import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link as LinkRouter } from 'react-router-dom';

import { MailOutline } from '@mui/icons-material';
import { IconButton, InputAdornment, Stack, Paper, Link } from '@mui/material';

import { EUnauthenticatedPath } from '@/core/router';
import {
  callbackOnInvalidZod,
  formatErrorForNotification,
} from '@/shared/utils';
import { LoadingButton, ControlledText } from '@shared/components';
import {
  UnauthenticatedContentAlert,
  IUnauthenticatedContentAlert,
  UnauthenticatedContentHeader,
} from '@/shared/layout';

import { RecoverData, recoverSchema } from '../domain';
import { useAuth } from '../hooks';

export function Recover() {
  const { recover, loading } = useAuth();

  const [alert, setAlert] = useState<IUnauthenticatedContentAlert>({
    message: '',
    type: 'error',
  });

  const { control, handleSubmit } = useForm<RecoverData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(recoverSchema),
  });

  async function handleRecover(data: RecoverData) {
    try {
      const response = await recover(data);

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
        title="Esqueceu sua senha?"
        description="Informe o endereço de e-mail da sua conta que enviaremos o link para recuperação."
      />

      <Stack
        component="form"
        onSubmit={handleSubmit(handleRecover, callbackOnInvalidZod)}
        gap={2}
      >
        <UnauthenticatedContentAlert
          alert={alert}
          clear={() => setAlert({ message: '', type: 'error' })}
        />

        <ControlledText
          label="E-mail"
          name="email"
          size="medium"
          placeholder="exemplo@email.com"
          control={control}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton edge="end" color="inherit">
                    <MailOutline />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <LoadingButton
          loading={loading}
          disabled={alert.type === 'success'}
          loadingIndicator="ENVIANDO..."
          variant="contained"
          type="submit"
          size="large"
          color="success"
        >
          ENVIAR
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
