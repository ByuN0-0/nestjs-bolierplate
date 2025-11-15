export class OffsetPaginationMetaDto {
  currentPage: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;

  constructor(meta: OffsetPaginationMetaDto) {
    this.currentPage = meta.currentPage;
    this.perPage = meta.perPage;
    this.totalPages = meta.totalPages;
    this.totalItems = meta.totalItems;
    this.hasNextPage = meta.hasNextPage;
    this.hasPreviousPage = meta.hasPreviousPage;
  }
}
