import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/modules/auth/hooks';
import { EAuthenticatedPath } from '../domain/enums/authenticated-path.enum';

export function GuestOnly() {
  const { authenticated } = useAuth();
  return authenticated ? (
    <Navigate to={EAuthenticatedPath.DASHBOARD} replace />
  ) : (
    <Outlet />
  );
}
