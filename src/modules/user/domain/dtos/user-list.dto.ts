import { EStatus, PaginationParams } from '@/shared/domain';

export interface UserListFiltersDTO {
  search?: string;
  roleId?: number;
  status?: EStatus;
}

export interface UserListDTO {
  filters?: UserListFiltersDTO;
  pagination: PaginationParams;
}
