import { ReceiptLong } from '@mui/icons-material';

import { OrderDetails, OrdersList } from '@/modules/orders/pages';

import { IRoute } from '../../domain/interfaces/route.interface';
import { EAuthenticatedPath } from '../../domain/enums/authenticated-path.enum';
import { RequiredAbility } from '../../hocs';

export const ORDER_ROUTE: IRoute = {
  name: 'Pedidos',
  icon: <ReceiptLong />,
  path: EAuthenticatedPath.ORDERS,
  ability: 'ORDERS',
  element: <RequiredAbility reference="ORDERS" />,
  children: [
    {
      index: true,
      name: 'Pedidos',
      element: <OrdersList />,
    },
    {
      name: 'Detalhes do Pedido',
      hidden: true,
      path: ':id',
      element: <OrderDetails />,
    },
  ],
};
