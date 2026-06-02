import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/modules/auth/hooks';
import { EUnauthenticatedPath } from '../domain/enums/unauthenticated-path.enum';

export function useRequireAuth() {
  const { authenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return () => {
    if (!authenticated) {
      navigate(EUnauthenticatedPath.LOGIN, {
        state: { from: location },
        replace: true,
      });
      return false;
    }
    return true;
  };
}
