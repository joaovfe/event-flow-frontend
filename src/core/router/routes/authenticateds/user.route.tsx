import { Person } from '@mui/icons-material';

import { UserList, UserCreate, UserUpdate } from '@/modules/user/pages';

import { RequiredAbility } from '../../hocs';
import { IRoute } from '../../domain/interfaces/route.interface';
import { EAuthenticatedPath } from '../../domain/enums/authenticated-path.enum';

export const USER_ROUTE: IRoute = {
  name: 'Usuários',
  icon: <Person />,
  path: EAuthenticatedPath.USERS,
  ability: 'USER',
  element: <RequiredAbility reference="USER" />,
  children: [
    {
      index: true,
      name: 'Usuários',
      element: <UserList />,
    },
    {
      name: 'Novo Usuário',
      hidden: true,
      path: 'novo',
      element: (
        <RequiredAbility reference="USER" action="canCreate">
          <UserCreate />
        </RequiredAbility>
      ),
    },
    {
      name: 'Editar Usuário',
      hidden: true,
      path: ':id',
      element: (
        <RequiredAbility reference="USER" action="canUpdate">
          <UserUpdate />
        </RequiredAbility>
      ),
    },
  ],
};
