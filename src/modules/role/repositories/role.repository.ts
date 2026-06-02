import { Repository } from '@/core/http/repository';

import { ID, Pagination } from '@/shared/domain';
import { isArray } from '@/shared/utils';

import { Role, RoleCreateDTO, RoleListDTO, RoleUpdateDTO } from '../domain';

export class RoleRepository extends Repository {
  static instance: RoleRepository;

  constructor() {
    super('roles');

    if (RoleRepository.instance) {
      return RoleRepository.instance;
    }

    RoleRepository.instance = this;
  }

  public async list(params?: RoleListDTO): Promise<Pagination<Role>> {
    const { status, data: response } = await this.http.get<Pagination<Role>>(
      '/',
      {
        params: {
          ...params?.filters,
          ...params?.pagination,
        },
      },
    );

    if (this.isOK(status)) {
      const { pages, total, data } = response;

      return {
        pages: pages ?? 1,
        total: total ?? 0,
        data: isArray(data) ? data.map((item) => new Role(item)) : [],
      };
    }

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async get(id: ID): Promise<Role> {
    const { status, data } = await this.http.get<Role>(`/${id}`);

    if (this.isOK(status)) return new Role(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async create(record: RoleCreateDTO): Promise<Role> {
    const { status, data } = await this.http.post<Role, RoleCreateDTO>(
      '/',
      record,
    );

    if (this.isOK(status)) return new Role(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async update(id: ID, record: RoleUpdateDTO): Promise<Role> {
    const { status, data } = await this.http.put<Role, RoleUpdateDTO>(
      `/${id}`,
      record,
    );

    if (this.isOK(status)) return new Role(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async delete(id: ID): Promise<void> {
    const { status } = await this.http.delete(`/${id}`);

    if (this.isOK(status)) return;

    throw new Error('Ops, algo inesperado aconteceu!');
  }
}
