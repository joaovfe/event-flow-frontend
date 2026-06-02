import { EntityWithStatus } from '@/shared/domain';

export interface UserCreateDTO extends EntityWithStatus {
  name: string;
  email: string;
  roleId: number;
  password: string;
  resetPassword: boolean;
}
