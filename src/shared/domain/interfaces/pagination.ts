export type Pagination<T> = {
  pages: number;
  total: number;
  data: Array<T>;
};
