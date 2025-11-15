import { OffsetPaginationMetaDto } from './offset-pagination-meta.dto';

export class OffsetPaginationDto<T> {
  items: T[];
  meta: OffsetPaginationMetaDto;

  constructor(items: T[], meta: OffsetPaginationMetaDto) {
    this.items = items;
    this.meta = meta;
  }
}
