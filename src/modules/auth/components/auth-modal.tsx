import { Dialog, Paper, Link, Stack } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';

import { EUnauthenticatedPath } from '@/core/router';
import { UnauthenticatedContentHeader } from '@/shared/layout';
import { isPublicRoute } from '@/shared/utils';
import { useAuthModal, EAuthModalType } from '../contexts/auth-modal.context';
import { LoginForm } from '../pages/components/login/login-form';
import { RegisterForm } from '../pages/components/register/register-form';

export function AuthModal() {
  const { open, type, closeModal, openLoginModal, openRegisterModal } =
    useAuthModal();
  const location = useLocation();

  const isPublicPage = isPublicRoute(location.pathname);

  if (!isPublicPage) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          gap: 2,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {type === EAuthModalType.LOGIN && (
          <>
            <UnauthenticatedContentHeader
              title="Bem vindo!"
              description="Digite seu e-mail e senha para acessar."
            />

            <LoginForm />

            <Stack spacing={1}>
              <Link
                component={RouterLink}
                to={EUnauthenticatedPath.RECOVER}
                color="text.secondary"
                onClick={closeModal}
              >
                Esqueceu sua senha?
              </Link>
              <Link
                component="button"
                type="button"
                color="text.secondary"
                onClick={openRegisterModal}
                sx={{ cursor: 'pointer', textAlign: 'left' }}
              >
                Não tem uma conta? Registrar-se
              </Link>
            </Stack>
          </>
        )}

        {type === EAuthModalType.REGISTER && (
          <>
            <UnauthenticatedContentHeader
              title="Criar conta"
              description="Preencha os campos para criar sua conta."
            />

            <RegisterForm />

            <Link
              component="button"
              type="button"
              color="text.secondary"
              onClick={openLoginModal}
              sx={{ cursor: 'pointer', textAlign: 'left' }}
            >
              Já possui uma conta? Acesse
            </Link>
          </>
        )}
      </Paper>
    </Dialog>
  );
}

