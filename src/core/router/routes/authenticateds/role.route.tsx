import { SupervisorAccount } from '@mui/icons-material';

import { RoleList, RoleCreate, RoleUpdate } from '@/modules/role/pages';

import { RequiredAbility } from '../../hocs';
import { EAuthenticatedPath } from '../../domain/enums/authenticated-path.enum';
import { IRoute } from '../../domain/interfaces/route.interface';

export const ROLE_ROUTE: IRoute = {
  name: 'Perfis de Usuário',
  icon: <SupervisorAccount />,
  path: EAuthenticatedPath.ROLES,
  ability: 'ROLE',
  element: <RequiredAbility reference="ROLE" />,
  children: [
    {
      index: true,
      name: 'Perfis de Usuário',
      element: <RoleList />,
    },
    {
      name: 'Novo Perfil de Usuário',
      hidden: true,
      path: 'novo',
      element: (
        <RequiredAbility reference="ROLE" action="canCreate">
          <RoleCreate />
        </RequiredAbility>
      ),
    },
    {
      name: 'Editar Perfil de Usuário',
      hidden: true,
      path: ':id',
      element: (
        <RequiredAbility reference="ROLE" action="canUpdate">
          <RoleUpdate />
        </RequiredAbility>
      ),
    },
  ],
};
