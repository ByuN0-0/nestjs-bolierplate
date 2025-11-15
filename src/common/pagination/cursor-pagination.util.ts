import type {
  CursorPaginationInput,
  CursorPaginationResponse,
} from './pagination.types';
import { DEFAULT_LIMIT, normalizePositiveInt } from './pagination.constants';

export const encodeCursor = (value: string) =>
  Buffer.from(value, 'utf-8').toString('base64url');

export const decodeCursor = (cursor?: string) =>
  cursor ? Buffer.from(cursor, 'base64url').toString('utf-8') : undefined;

export const paginateByCursor = <T>({
  items,
  limit,
  hasMore,
  previousCursor,
  getCursor,
}: CursorPaginationInput<T>): CursorPaginationResponse<T> => {
  const safeLimit = normalizePositiveInt(limit, DEFAULT_LIMIT);
  const demandMore = hasMore ?? items.length > safeLimit;
  const payload = demandMore ? items.slice(0, safeLimit) : items;
  const hasNext = demandMore;
  const nextCursor =
    hasNext && payload.length
      ? encodeCursor(getCursor(payload[payload.length - 1]))
      : undefined;

  return {
    items: payload,
    meta: {
      limit: safeLimit,
      hasNext,
      hasPrevious: Boolean(previousCursor),
      nextCursor,
      previousCursor,
    },
  };
};
