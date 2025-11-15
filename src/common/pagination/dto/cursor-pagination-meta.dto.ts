export class CursorPaginationMetaDto {
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
  nextCursor?: string;
  previousCursor?: string;

  constructor(meta: CursorPaginationMetaDto) {
    this.limit = meta.limit;
    this.hasNext = meta.hasNext;
    this.hasPrevious = meta.hasPrevious;
    this.nextCursor = meta.nextCursor;
    this.previousCursor = meta.previousCursor;
  }
}
