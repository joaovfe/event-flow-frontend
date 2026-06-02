import { Button, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Dashboard } from '@mui/icons-material';

import { EUnauthenticatedPath, EAuthenticatedPath } from '@/core/router';
import { useAuth } from '@/modules/auth/hooks';
import { AuthenticatedHeaderProfile } from '@/shared/layout/authenticated/components/authenticated-header-profile';
import { useAuthModal } from '@/modules/auth/contexts/auth-modal.context';
import { ERoleReference } from '@/modules/role/domain';
import { isPublicRoute } from '@/shared/utils';

export function LoginOrProfileButton() {
  const { authenticated, user } = useAuth();
  const { openLoginModal, openRegisterModal } = useAuthModal();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isPublicPage = isPublicRoute(location.pathname);
  const isMaster = user?.role?.reference === ERoleReference.MASTER;

  if (authenticated) {
    return (
      <Stack direction="row" spacing={1} alignItems="center">
        {isMaster && isPublicPage && (
          <Button
            variant="outlined"
            startIcon={<Dashboard />}
            onClick={() => navigate(EAuthenticatedPath.DASHBOARD)}
            color="success"
          >
            Dashboard
          </Button>
        )}
        <AuthenticatedHeaderProfile />
      </Stack>
    );
  }

  if (isPublicPage) {
    return (
      <Stack direction="row" spacing={1}>
        <Button onClick={openLoginModal} variant="outlined" color="success">
          Acessar
        </Button>
        <Button
          onClick={openRegisterModal}
          variant="contained"
          color="success"
        >
          Cadastre-se
        </Button>
      </Stack>
    );
  }

  return (
    <Button
      component={RouterLink}
      to={EUnauthenticatedPath.REGISTER}
      variant="contained"
      color="success"
    >
      Cadastre-se
    </Button>
  );
}
