import { QrCodeScanner } from '@mui/icons-material';

import { CheckInPage } from '@/modules/checkin/pages';

import { IRoute } from '../../domain/interfaces/route.interface';
import { EAuthenticatedPath } from '../../domain/enums/authenticated-path.enum';
import { RequiredAbility } from '../../hocs';

export const CHECK_IN_ROUTE: IRoute = {
  name: 'Check-in',
  icon: <QrCodeScanner />,
  path: EAuthenticatedPath.CHECKIN,
  ability: 'CHECKIN',
  element: <RequiredAbility reference="CHECKIN" />,
  children: [
    {
      index: true,
      name: 'Check-in',
      element: <CheckInPage />,
    },
  ],
};
