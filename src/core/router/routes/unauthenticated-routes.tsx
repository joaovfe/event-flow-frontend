import { EUnauthenticatedPath } from '../domain/enums/unauthenticated-path.enum';
import { IRoute } from '../domain/interfaces/route.interface';

import { Login, Reset, Recover, Register } from '@/modules/auth/pages';

export const UNAUTHENTICATED_ROUTES: Array<IRoute> = [
  {
    name: 'Acessar',
    element: <Login />,
    path: EUnauthenticatedPath.LOGIN,
  },
  {
    name: 'Recuperar Senha',
    path: EUnauthenticatedPath.RECOVER,
    element: <Recover />,
  },
  {
    name: 'Recuperação de Senha',
    path: EUnauthenticatedPath.RESET,
    element: <Reset />,
  },
  {
    name: 'Registrar Usuário',
    path: EUnauthenticatedPath.REGISTER,
    element: <Register />,
  },
];
