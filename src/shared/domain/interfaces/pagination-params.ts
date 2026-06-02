import { Sort } from '../types';

export type PaginationParams = {
  take?: number;
  skip?: number;
  orderBy?: string;
  ordering?: Sort;
};
