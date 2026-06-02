import { Repository } from '@/core/http';
import { ID, Pagination } from '@/shared/domain';

import { User, UserCreateDTO, UserUpdateDTO, UserListDTO } from '../domain';
import { UserRegisterDTO } from '../domain/dtos/user-register.dto';

export class UserRepository extends Repository {
  static instance: UserRepository;

  constructor() {
    super('users');

    if (UserRepository.instance) {
      return UserRepository.instance;
    }

    UserRepository.instance = this;
  }

  public async get(id: ID): Promise<User> {
    const { status, data } = await this.http.get<User>(`/${id}`);

    if (this.isOK(status)) return new User(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async list(dto?: UserListDTO): Promise<Pagination<User>> {
    const { status, data } = await this.http.get<Pagination<User>>('/', {
      params: { ...dto?.filters, ...dto?.pagination },
    });

    if (this.isOK(status)) {
      return {
        data: data.data,
        total: data.total ?? 0,
        pages: data.pages ?? 1,
      };
    }

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async create(record: UserCreateDTO): Promise<User> {
    const { status, data } = await this.http.post<User, UserCreateDTO>(
      '/',
      record,
    );

    if (this.isOK(status)) return new User(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async update(id: ID, record: UserUpdateDTO): Promise<User> {
    const { status, data } = await this.http.put<User, UserUpdateDTO>(
      `/${id}`,
      record,
    );

    if (this.isOK(status)) return new User(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async delete(id: ID): Promise<boolean> {
    const { status } = await this.http.delete(`/${id}`);

    if (status) return this.isOK(status);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async register(data: UserRegisterDTO): Promise<void> {
    const { status } = await this.http.post('/public/register', data);

    if (!this.isOK(status)) {
      throw new Error('Ops, algo inesperado aconteceu!');
    }
  }
}
