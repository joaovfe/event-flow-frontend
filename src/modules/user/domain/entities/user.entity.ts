import { Role } from '@/modules/role/domain';
import { EStatus } from '@/shared/domain';

export class User {
  id: number = 0;
  name: string = '';
  email: string = '';

  status: EStatus = EStatus.INACTIVE;
  resetPassword: boolean = false;

  role: Role = new Role({});

  createdAt: string = '';
  updatedAt: string = '';
  deletedAt?: string;

  public constructor(data: Partial<User>) {
    const role = data.role && new Role(data.role);

    Object.assign(this, { ...data, role });
  }
}
