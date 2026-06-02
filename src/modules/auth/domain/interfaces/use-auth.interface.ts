import { IRecoverRequestDTO, ILoginRequestDTO, IResetRequestDTO } from '../dto';
import { IAuth } from './auth.interface';

export interface IUseAuth extends IAuth {
  login: (data: ILoginRequestDTO) => Promise<void>;
  logout: () => Promise<void>;
  recover: (data: IRecoverRequestDTO) => Promise<string>;
  reset: (data: IResetRequestDTO) => Promise<string>;
  loading: boolean;
  refreshUser: () => Promise<void>;
}
