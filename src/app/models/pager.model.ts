export class Pager {

    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    startIndex: number;
    endIndex: number;
    pages: number[];

  constructor(obj?: any) {
    this.totalItems    = obj && obj.totalItems    || 0;
    this.currentPage   = obj && obj.currentPage   || 0;
    this.pageSize      = obj && obj.pageSize      || 0;
    this.totalPages    = obj && obj.totalPages    || 0;
    this.startPage     = obj && obj.startPage     || 0;
    this.endPage       = obj && obj.endPage       || 0;
    this.startIndex    = obj && obj.startIndex    || 0;
    this.endIndex      = obj && obj.endIndex      || 0;
    this.pages         = obj && obj.pages         || [1];
  }
}
