import { BaseEntity } from '@/shared/domain/entities/base-entity.entity';
import { Event } from './event.entity';

export class TicketType extends BaseEntity {
  id: number = 0;
  name: string = '';
  description?: string;
  price: number = 0;
  quantity: number = 0;
  soldQuantity: number = 0;
  active: boolean = true;
  event?: Event;

  public constructor(data: Partial<TicketType>) {
    super();
    Object.assign(this, data);
  }
}
