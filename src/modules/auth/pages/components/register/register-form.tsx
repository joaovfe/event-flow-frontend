import { zodResolver } from '@hookform/resolvers/zod';
import { MailOutline } from '@mui/icons-material';
import { IconButton, InputAdornment, Stack } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  IUnauthenticatedContentAlert,
  UnauthenticatedContentAlert,
} from '@/shared/layout';
import { callbackOnInvalidZod } from '@/shared/utils';
import {
  ControlledPassword,
  ControlledText,
  LoadingButton
} from '@shared/components';

import { EUnauthenticatedPath } from '@/core/router';
import { useAuthModal } from '@/modules/auth/contexts/auth-modal.context';
import { RegisterData, registerSchema } from '@/modules/auth/domain';
import { UserRepository } from '@/modules/user/repositories';
import { isPublicRoute } from '@/shared/utils';

export function RegisterForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const repository = new UserRepository();
  const { closeModal, openLoginModal } = useAuthModal();
  const isPublicPage = isPublicRoute(location.pathname);

  const [alert, setAlert] = useState<IUnauthenticatedContentAlert>({
    message: '',
    type: 'error',
  });

  const { control, handleSubmit } = useForm<RegisterData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(data: RegisterData) {
    try {
      await repository.register(data);

      setAlert({
        message: 'Registro realizado com sucesso. Verifique seu e-mail.',
        type: 'success',
      });

      if (isPublicPage) {
        setTimeout(() => {
          closeModal();
          openLoginModal();
        }, 1200);
      } else {
        setTimeout(() => navigate(EUnauthenticatedPath.LOGIN), 1200);
      }
    } catch (error) {
      setAlert({
        message: 'Erro ao registrar usuário. Tente novamente.',
        type: 'error',
      });
    }
  }

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(handleRegister, callbackOnInvalidZod)}
      gap={2}
    >
      <UnauthenticatedContentAlert
        alert={alert}
        clear={() => setAlert({ message: '', type: 'error' })}
      />

      <ControlledText
        label="Nome"
        name="name"
        size="medium"
        control={control}
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

      <ControlledPassword
        label="Confirmar senha"
        name="confirmPassword"
        size="medium"
        control={control}
      />

      <LoadingButton
        type="submit"
        size="large"
        color="success"
        variant="contained"
        loading={false}
      >
        REGISTRAR
      </LoadingButton>
    </Stack>
  );
}

export default RegisterForm;
