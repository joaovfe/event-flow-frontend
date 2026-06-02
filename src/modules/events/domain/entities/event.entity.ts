import { BaseEntity } from '@/shared/domain/entities/base-entity.entity';
import { TicketType } from './ticket-type.entity';

export type EEventStatus = 'ACTIVE' | 'INACTIVE';

export class Event extends BaseEntity {
  id: number = 0;
  title: string = '';
  slug: string = '';
  description: string = '';
  image?: string;
  location: string = '';
  startDate: string = '';
  endDate: string = '';
  status: EEventStatus = 'ACTIVE';
  ticketTypes?: TicketType[];

  public constructor(data: Partial<Event>) {
    super();
    Object.assign(this, data);
  }
}
