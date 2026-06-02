import { BaseEntity } from '@/shared/domain/entities/base-entity.entity';
import { Event, TicketType } from '@/modules/events/domain';

export type ETicketStatus = 'VALID' | 'USED' | 'CANCELLED';

export class Ticket extends BaseEntity {
  id: number = 0;
  code: string = '';
  qrCode: string = '';
  status: ETicketStatus = 'VALID';
  usedAt?: string;
  event?: Event;
  ticketType?: TicketType;

  public constructor(data: Partial<Ticket>) {
    super();
    Object.assign(this, data);
  }
}
