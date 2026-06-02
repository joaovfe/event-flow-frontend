import { EStatus, PaginationParams } from '@/shared/domain';
import { ERoleReference } from '../enums';

export interface RoleListFilterDTO {
  search?: string;
  reference?: ERoleReference;
  status?: EStatus;
}

export interface RoleListDTO {
  filters?: RoleListFilterDTO;
  pagination?: PaginationParams;
}
