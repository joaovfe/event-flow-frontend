import { Repository } from '@/core/http';
import { Ticket } from '@/modules/orders/domain';

import { CheckInDTO, CheckInResponse } from '../domain';

export class CheckInRepository extends Repository {
  static instance: CheckInRepository;

  constructor() {
    super('check-in');

    if (CheckInRepository.instance) {
      return CheckInRepository.instance;
    }

    CheckInRepository.instance = this;
  }

  public async inspect(code: string): Promise<Ticket> {
    const { status, data } = await this.http.get<Ticket>(`/${code}`);

    if (this.isOK(status)) return new Ticket(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async confirm(code: string): Promise<CheckInResponse> {
    const { status, data } = await this.http.post<CheckInResponse, CheckInDTO>('', { code });

    if (this.isOK(status)) return data;

    throw new Error('Ops, algo inesperado aconteceu!');
  }
}
