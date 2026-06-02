import { User } from '@/modules/user/domain/entities';
import { EAuthAction } from '../enums/auth-action.enum';

export interface IAuthAction {
  type: EAuthAction;
  user?: User;
}
