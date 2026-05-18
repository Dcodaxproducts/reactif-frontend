export type PaginationMeta = {
  currentPage: number;
  totalPages: number;
};

export type ApiListResponse<T> = {
  data: T[];
  pagination?: PaginationMeta;
};

export type ApiItemResponse<T> = {
  data: T;
};
