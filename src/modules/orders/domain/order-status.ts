import { EOrderStatus } from './entities';

export const ORDER_STATUS_LABEL: Record<EOrderStatus, string> = {
  PENDING: 'Pendente',
  PAID: 'Pago',
  CANCELLED: 'Cancelado',
};

export const ORDER_STATUS_COLOR: Record<EOrderStatus, 'success' | 'warning' | 'default'> = {
  PENDING: 'warning',
  PAID: 'success',
  CANCELLED: 'default',
};
