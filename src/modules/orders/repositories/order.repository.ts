import { Repository } from '@/core/http';
import { Pagination } from '@/shared/domain';

import {
  CheckoutDTO,
  Order,
  OrderListDTO,
  ValidateCartDTO,
  ValidatedCart,
} from '../domain';

export class OrderRepository extends Repository {
  static instance: OrderRepository;

  constructor() {
    super('orders');

    if (OrderRepository.instance) {
      return OrderRepository.instance;
    }

    OrderRepository.instance = this;
  }

  public async list(dto?: OrderListDTO): Promise<Pagination<Order>> {
    const { status, data } = await this.http.get<Pagination<Order>>('/', {
      params: { ...dto?.filters, ...dto?.pagination },
    });

    if (this.isOK(status)) {
      return {
        data: (data.data ?? []).map((order) => new Order(order)),
        total: data.total ?? 0,
        pages: data.pages ?? 1,
      };
    }

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async get(id: number): Promise<Order> {
    const { status, data } = await this.http.get<Order>(`/${id}`);

    if (this.isOK(status)) return new Order(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async validateCart(dto: ValidateCartDTO): Promise<ValidatedCart> {
    const { status, data } = await this.http.post<ValidatedCart, ValidateCartDTO>(
      '/public/validate-cart',
      dto,
    );

    if (this.isOK(status)) return data;

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async checkout(dto: CheckoutDTO): Promise<Order> {
    const { status, data } = await this.http.post<Order, CheckoutDTO>('/checkout', dto);

    if (this.isOK(status)) return new Order(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async getPublic(uuid: string): Promise<Order> {
    const { status, data } = await this.http.get<Order>(`/public/${uuid}`);

    if (this.isOK(status)) return new Order(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }
}
