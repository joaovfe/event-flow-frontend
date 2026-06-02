import { PaginationParams } from '@/shared/domain';
import { EOrderStatus } from '../entities';

export interface OrderListFiltersDTO {
  search?: string;
  status?: EOrderStatus;
}

export interface OrderListDTO {
  filters?: OrderListFiltersDTO;
  pagination: PaginationParams;
}

export interface CartItemInput {
  ticketTypeId: number;
  quantity: number;
}

export interface ValidateCartDTO {
  items: CartItemInput[];
}

export interface ValidatedCartItem {
  ticketTypeId: number;
  name: string;
  eventTitle: string;
  price: number;
  quantity: number;
  available: number;
  subtotal: number;
  valid: boolean;
  reason?: string;
}

export interface ValidatedCart {
  items: ValidatedCartItem[];
  total: number;
  valid: boolean;
}

export interface CheckoutDTO {
  customerName: string;
  customerEmail: string;
  customerDocument?: string;
  items: CartItemInput[];
}
