import { Link as LinkRouter } from 'react-router-dom';
import { Link, Paper } from '@mui/material';

import { EUnauthenticatedPath } from '@/core/router';
import { UnauthenticatedContentHeader } from '@/shared/layout';

import LoginForm from './components/login/login-form';

export function Login() {
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
        title="Bem vindo!"
        description="Digite seu e-mail e senha para acessar."
      />

      <LoginForm />

      <Link
        color="text.secondary"
        component={LinkRouter}
        to={EUnauthenticatedPath.RECOVER}
      >
        Esqueceu sua senha?
      </Link>
      <Link
        color="text.secondary"
        component={LinkRouter}
        to={EUnauthenticatedPath.REGISTER}
        sx={{ mt: 1 }}
      >
        Não tem uma conta? Registrar-se
      </Link>
    </Paper>
  );
}
