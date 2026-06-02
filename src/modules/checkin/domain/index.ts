import { Ticket } from '@/modules/orders/domain';

export type ECheckInResult = 'SUCCESS' | 'ALREADY_USED' | 'CANCELLED';

export interface CheckInResponse {
  result: ECheckInResult;
  message: string;
  ticket: Ticket;
}

export interface CheckInDTO {
  code: string;
}
