import { PaginationParams } from '@/shared/domain';
import { EEventStatus } from '../entities';

export interface EventListFiltersDTO {
  search?: string;
  status?: EEventStatus;
}

export interface EventListDTO {
  filters?: EventListFiltersDTO;
  pagination: PaginationParams;
}

export interface EventPublicListDTO {
  search?: string;
  take?: number;
  skip?: number;
}
