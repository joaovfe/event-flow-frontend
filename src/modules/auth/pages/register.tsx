import { Link as LinkRouter } from 'react-router-dom';
import { Link, Paper } from '@mui/material';

import { EUnauthenticatedPath } from '@/core/router';
import { UnauthenticatedContentHeader } from '@/shared/layout';

import RegisterForm from './components/register/register-form';

export function Register() {
  return (
    <Paper
      elevation={3}
      sx={{
        gap: 2,
        padding: 4,
        width: '420px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <UnauthenticatedContentHeader
        title="Criar conta"
        description="Preencha os campos para criar sua conta."
      />

      <RegisterForm />

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

export default Register;
