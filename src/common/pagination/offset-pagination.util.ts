import type {
  OffsetPaginationOptions,
  OffsetPaginationResponse,
} from './pagination.types';
import { DEFAULT_LIMIT, normalizePositiveInt } from './pagination.constants';

export const buildOffsetPaginationMeta = ({
  totalItems,
  page = 1,
  limit = DEFAULT_LIMIT,
}: OffsetPaginationOptions & { page?: number; limit?: number }) => {
  const perPage = normalizePositiveInt(limit, DEFAULT_LIMIT);
  const currentPage = Math.max(1, Math.floor(page));
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage || 1));
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return {
    currentPage,
    perPage,
    totalPages,
    totalItems,
    hasNextPage,
    hasPreviousPage,
  };
};

export const paginateByOffset = <T>(
  items: T[],
  options: OffsetPaginationOptions,
): OffsetPaginationResponse<T> => ({
  items,
  meta: buildOffsetPaginationMeta(options),
});
