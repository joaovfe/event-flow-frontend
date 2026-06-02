import { User } from '@modules/user/domain/entities';
export interface IAuth {
  authenticated: boolean;
  user: User | null;
}
