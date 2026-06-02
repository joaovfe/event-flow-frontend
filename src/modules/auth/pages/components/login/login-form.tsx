import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation } from 'react-router-dom';
import { IconButton, InputAdornment, Stack } from '@mui/material';
import { MailOutline } from '@mui/icons-material';

import {
  callbackOnInvalidZod,
  formatErrorForNotification,
} from '@/shared/utils';
import {
  UnauthenticatedContentAlert,
  IUnauthenticatedContentAlert,
} from '@/shared/layout';
import {
  LoadingButton,
  ControlledPassword,
  ControlledText,
  ControlledCheckbox,
} from '@shared/components';
import { LoginData, loginSchema } from '@/modules/auth/domain';
import { useAuth } from '@/modules/auth/hooks';
import { useAuthModal } from '@/modules/auth/contexts/auth-modal.context';
import { isPublicRoute } from '@/shared/utils';

export function LoginForm() {
  const { login, loading } = useAuth();
  const { closeModal } = useAuthModal();
  const location = useLocation();
  const isPublicPage = isPublicRoute(location.pathname);

  const [alert, setAlert] = useState<IUnauthenticatedContentAlert>({
    message: '',
    type: 'error',
  });

  const { control, handleSubmit } = useForm<LoginData>({
    defaultValues: {
      email: '',
      password: '',
      remember: true,
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(data: LoginData) {
    try {
      await login(data);
      if (isPublicPage) {
        closeModal();
      }
    } catch (error) {
      setAlert({ message: formatErrorForNotification(error), type: 'error' });
    }
  }

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(handleLogin, callbackOnInvalidZod)}
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
                <IconButton edge="end" disableRipple>
                  <MailOutline />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <ControlledPassword
        label="Senha"
        name="password"
        size="medium"
        control={control}
      />

      <ControlledCheckbox
        label="Lembrar-me"
        name="remember"
        control={control}
      />

      <LoadingButton
        type="submit"
        size="large"
        color="success"
        variant="contained"
        loading={loading}
        loadingIndicator="ACESSANDO..."
      >
        ACESSAR
      </LoadingButton>
    </Stack>
  );
}

export default LoginForm;
