import { Repository } from '@/core/http';

import {
  TicketType,
  TicketTypeCreateDTO,
  TicketTypeListDTO,
  TicketTypeUpdateDTO,
} from '../domain';

export class TicketTypeRepository extends Repository {
  static instance: TicketTypeRepository;

  constructor() {
    super('ticket-types');

    if (TicketTypeRepository.instance) {
      return TicketTypeRepository.instance;
    }

    TicketTypeRepository.instance = this;
  }

  public async list(dto?: TicketTypeListDTO): Promise<TicketType[]> {
    const { status, data } = await this.http.get<{ data: TicketType[]; total: number; pages: number }>('/', {
      params: { ...dto },
    });

    if (this.isOK(status)) return (data.data ?? []).map((t) => new TicketType(t));

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async get(id: number): Promise<TicketType> {
    const { status, data } = await this.http.get<TicketType>(`/${id}`);

    if (this.isOK(status)) return new TicketType(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async create(record: TicketTypeCreateDTO): Promise<TicketType> {
    const { status, data } = await this.http.post<TicketType, TicketTypeCreateDTO>('/', record);

    if (this.isOK(status)) return new TicketType(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async update(id: number, record: TicketTypeUpdateDTO): Promise<TicketType> {
    const { status, data } = await this.http.put<TicketType, TicketTypeUpdateDTO>(`/${id}`, record);

    if (this.isOK(status)) return new TicketType(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async toggleActive(id: number): Promise<TicketType> {
    const { status, data } = await this.http.patch<TicketType, undefined>(`/${id}/toggle-active`);

    if (this.isOK(status)) return new TicketType(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async delete(id: number): Promise<boolean> {
    const { status } = await this.http.delete(`/${id}`);

    if (status) return this.isOK(status);

    throw new Error('Ops, algo inesperado aconteceu!');
  }
}
