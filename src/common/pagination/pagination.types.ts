export interface OffsetPaginationMeta {
  currentPage: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface OffsetPaginationOptions {
  page?: number;
  limit?: number;
  totalItems: number;
}

export interface OffsetPaginationResponse<T> {
  items: T[];
  meta: OffsetPaginationMeta;
}

export interface CursorPaginationMeta {
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
  nextCursor?: string;
  previousCursor?: string;
}

export interface CursorPaginationInput<T> {
  items: T[];
  limit?: number;
  hasMore?: boolean;
  previousCursor?: string;
  getCursor: (item: T) => string;
}

export interface CursorPaginationResponse<T> {
  items: T[];
  meta: CursorPaginationMeta;
}
