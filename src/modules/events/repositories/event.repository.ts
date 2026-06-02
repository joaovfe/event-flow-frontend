import { Repository } from '@/core/http';
import { Pagination } from '@/shared/domain';

import {
  Event,
  EventCreateDTO,
  EventListDTO,
  EventPublicListDTO,
  EventUpdateDTO,
} from '../domain';

export class EventRepository extends Repository {
  static instance: EventRepository;

  constructor() {
    super('events');

    if (EventRepository.instance) {
      return EventRepository.instance;
    }

    EventRepository.instance = this;
  }

  public async list(dto?: EventListDTO): Promise<Pagination<Event>> {
    const { status, data } = await this.http.get<Pagination<Event>>('/', {
      params: { ...dto?.filters, ...dto?.pagination },
    });

    if (this.isOK(status)) {
      return {
        data: (data.data ?? []).map((event) => new Event(event)),
        total: data.total ?? 0,
        pages: data.pages ?? 1,
      };
    }

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async get(id: number): Promise<Event> {
    const { status, data } = await this.http.get<Event>(`/${id}`);

    if (this.isOK(status)) return new Event(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async create(record: EventCreateDTO): Promise<Event> {
    const { status, data } = await this.http.post<Event, EventCreateDTO>('/', record);

    if (this.isOK(status)) return new Event(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async update(id: number, record: EventUpdateDTO): Promise<Event> {
    const { status, data } = await this.http.put<Event, EventUpdateDTO>(`/${id}`, record);

    if (this.isOK(status)) return new Event(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async toggleStatus(id: number): Promise<Event> {
    const { status, data } = await this.http.patch<Event, undefined>(`/${id}/toggle-status`);

    if (this.isOK(status)) return new Event(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async delete(id: number): Promise<boolean> {
    const { status } = await this.http.delete(`/${id}`);

    if (status) return this.isOK(status);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async listPublic(dto?: EventPublicListDTO): Promise<Pagination<Event>> {
    const { status, data } = await this.http.get<Pagination<Event>>('/public', {
      params: { ...dto },
    });

    if (this.isOK(status)) {
      return {
        data: (data.data ?? []).map((event) => new Event(event)),
        total: data.total ?? 0,
        pages: data.pages ?? 1,
      };
    }

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async getPublic(slug: string): Promise<Event> {
    const { status, data } = await this.http.get<Event>(`/public/${slug}`);

    if (this.isOK(status)) return new Event(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }
}
