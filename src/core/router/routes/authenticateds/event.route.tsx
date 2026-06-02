import { EventNote } from '@mui/icons-material';

import { EventCreate, EventsList, EventUpdate } from '@/modules/events/pages';

import { IRoute } from '../../domain/interfaces/route.interface';
import { EAuthenticatedPath } from '../../domain/enums/authenticated-path.enum';
import { RequiredAbility } from '../../hocs';

export const EVENT_ROUTE: IRoute = {
  name: 'Eventos',
  icon: <EventNote />,
  path: EAuthenticatedPath.EVENTS,
  ability: 'EVENTS',
  element: <RequiredAbility reference="EVENTS" />,
  children: [
    {
      index: true,
      name: 'Eventos',
      element: <EventsList />,
    },
    {
      name: 'Novo Evento',
      hidden: true,
      path: 'novo',
      element: (
        <RequiredAbility reference="EVENTS" action="canCreate">
          <EventCreate />
        </RequiredAbility>
      ),
    },
    {
      name: 'Editar Evento',
      hidden: true,
      path: ':id',
      element: (
        <RequiredAbility reference="EVENTS" action="canUpdate">
          <EventUpdate />
        </RequiredAbility>
      ),
    },
  ],
};
