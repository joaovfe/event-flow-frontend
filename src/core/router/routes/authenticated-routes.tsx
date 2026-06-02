import { Navigate } from 'react-router-dom';
import { Dashboard as DashboardIcon } from '@mui/icons-material';
import { EAuthenticatedPath } from '../domain/enums/authenticated-path.enum';
import { IRoute } from '../domain/interfaces/route.interface';
import { Dashboard } from '@/modules/home/pages/dashboard';
import {
  ROLE_ROUTE,
  USER_ROUTE,
  EVENT_ROUTE,
  ORDER_ROUTE,
  CHECK_IN_ROUTE,
} from './authenticateds';

export const AUTHENTICATED_ROUTES: Array<IRoute> = [
  {
    name: 'Redirect',
    hidden: true,
    path: '*',
    element: <Navigate to={EAuthenticatedPath.DASHBOARD} />,
  },
  {
    name: 'Dashboard',
    path: EAuthenticatedPath.DASHBOARD,
    icon: <DashboardIcon />,
    element: <Dashboard />,
  },
  EVENT_ROUTE,
  ORDER_ROUTE,
  CHECK_IN_ROUTE,
  USER_ROUTE,
  ROLE_ROUTE,
];
