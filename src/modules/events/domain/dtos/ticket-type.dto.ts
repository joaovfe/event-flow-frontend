export interface TicketTypeListDTO {
  eventId?: number;
  active?: boolean;
}

export interface TicketTypeCreateDTO {
  eventId: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  active?: boolean;
}

export interface TicketTypeUpdateDTO {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  active?: boolean;
}
