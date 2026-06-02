export interface CartItem {
  ticketTypeId: number;
  eventSlug: string;
  eventTitle: string;
  ticketTypeName: string;
  price: number;
  quantity: number;
  maxAvailable: number;
}
