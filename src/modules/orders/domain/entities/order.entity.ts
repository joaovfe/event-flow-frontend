import { BaseEntity } from '@/shared/domain/entities/base-entity.entity';
import { Ticket } from './ticket.entity';

export type EOrderStatus = 'PENDING' | 'PAID' | 'CANCELLED';

export class Order extends BaseEntity {
  id: number = 0;
  customerName: string = '';
  customerEmail: string = '';
  customerDocument?: string;
  total: number = 0;
  status: EOrderStatus = 'PENDING';
  tickets?: Ticket[];

  public constructor(data: Partial<Order>) {
    super();
    Object.assign(this, data);
  }
}
