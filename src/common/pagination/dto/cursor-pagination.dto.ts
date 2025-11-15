import { CursorPaginationMetaDto } from './cursor-pagination-meta.dto';

export class CursorPaginationDto<T> {
  items: T[];
  meta: CursorPaginationMetaDto;

  constructor(items: T[], meta: CursorPaginationMetaDto) {
    this.items = items;
    this.meta = meta;
  }
}
