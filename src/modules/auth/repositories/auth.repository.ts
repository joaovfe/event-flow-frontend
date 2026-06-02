import { Repository } from '@/core/http/repository';
import { IMessage } from '@/shared/domain';
import { User } from '@/modules/user/domain/entities';

import { ILoginRequestDTO, IResetRequestDTO, ILoginResponseDTO, IRecoverRequestDTO } from '../domain';

export class AuthRepository extends Repository {
  static instance: AuthRepository;

  constructor() {
    super('auth');

    if (AuthRepository.instance) {
      return AuthRepository.instance;
    }

    AuthRepository.instance = this;
  }

  public async login(login: ILoginRequestDTO): Promise<ILoginResponseDTO> {
    const { status, data } = await this.http.post<ILoginResponseDTO, ILoginRequestDTO>('/login', login);

    if (this.isOK(status)) {
      return data;
    }

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async check(): Promise<User> {
    const { status, data } = await this.http.get<User>('/user');

    if (this.isOK(status)) return new User(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async recover(recover: IRecoverRequestDTO): Promise<IMessage> {
    const { status, data } = await this.http.post<IMessage, IRecoverRequestDTO>('/password/recovery', recover);

    if (this.isOK(status)) {
      return data;
    }

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async reset(reset: IResetRequestDTO): Promise<IMessage> {
    const { status, data } = await this.http.patch<IMessage, IResetRequestDTO>('/password/reset', reset);

    if (this.isOK(status)) {
      return data;
    }

    throw new Error('Ops, algo inesperado aconteceu!');
  }
}
