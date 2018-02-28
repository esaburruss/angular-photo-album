import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Pager } from '../../models/pager.model';
@Component({
  selector: 'app-pager',
  template: `
    <ul *ngIf="_pager.pages && _pager.pages.length" class="pagination">
        <li [ngClass]="{disabled:_pager.currentPage === 1}">
            <a (click)="setPage(1)">First</a>
        </li>
        <li [ngClass]="{disabled:_pager.currentPage === 1}">
            <a (click)="setPage(_pager.currentPage - 1)">Previous</a>
        </li>
        <li *ngFor="let page of _pager.pages" [ngClass]="{active:_pager.currentPage === page}">
            <a (click)="setPage(page)">{{page}}</a>
        </li>
        <li [ngClass]="{disabled:_pager.currentPage === _pager.totalPages}">
            <a (click)="setPage(_pager.currentPage + 1)">Next</a>
        </li>
        <li [ngClass]="{disabled:_pager.currentPage === _pager.totalPages}">
            <a (click)="setPage(_pager.totalPages)">Last</a>
        </li>
    </ul>
    `
})
export class AppPagerComponent implements OnInit {

  _setPage = function() {console.log('unimplemented')};
  constructor() { }



  //private allItems: any[];

  @Input()
  set pager(pager: any) {
    this._pager=pager;
  }

  @Input()
  set setPage(setPage: () => any) {
    this._setPage=setPage;
  }

  private _pager: Pager = new Pager({});

  // paged items
  //pagedItems: any[];

  ngOnInit() {

  }

  private _pageChange(page: number) {
      if (page < 1 || page > this._pager.totalPages) {
          return;
      }
      this._setPage();
      // get pager object from service
      //this.pager = this.pagerService.getPager(this.allItems.length, page);

      // get current page of items
      //this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
