import { IRoute } from '../domain/interfaces/route.interface';
import { EPublicPath } from '../domain/enums/public-path.enum';
import { PublicHome } from '@/modules/home/pages/public-home';
import { EventDetails } from '@/modules/events/pages';
import { CartPage, CheckoutPage, OrderSuccessPage } from '@/modules/cart/pages';

export const PUBLIC_ROUTES: Array<IRoute> = [
  {
    name: 'Home',
    path: EPublicPath.HOME,
    element: <PublicHome />,
  },
  {
    name: 'Detalhes do Evento',
    path: EPublicPath.EVENT_DETAILS,
    element: <EventDetails />,
  },
  {
    name: 'Carrinho',
    path: EPublicPath.CART,
    element: <CartPage />,
  },
  {
    name: 'Checkout',
    path: EPublicPath.CHECKOUT,
    element: <CheckoutPage />,
  },
  {
    name: 'Pedido',
    path: EPublicPath.ORDER_SUCCESS,
    element: <OrderSuccessPage />,
  },
];
