import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import { Pager } from '../../models/pager.model';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-pager',
  template: `
    <div class="row">
      <div class="col-md-10">
        <ul *ngIf="_pager.pages && _pager.pages.length" class="pagination float-right">
            <li [ngClass]="{disabled:_pager.currentPage === 1}">
                <a (click)="_pageChange(1)">First</a>
            </li>
            <li [ngClass]="{disabled:_pager.currentPage === 1}">
                <a (click)="_pageChange(_pager.currentPage - 1)">Previous</a>
            </li>
            <li *ngFor="let page of _pager.pages" [ngClass]="{active:_pager.currentPage === page}">
                <a (click)="_pageChange(page)">{{page}}</a>
            </li>
            <li [ngClass]="{disabled:_pager.currentPage === _pager.totalPages}">
                <a (click)="_pageChange(_pager.currentPage + 1)">Next</a>
            </li>
            <li [ngClass]="{disabled:_pager.currentPage === _pager.totalPages}">
                <a (click)="_pageChange(_pager.totalPages)">Last</a>
            </li>
        </ul>
      </div>
      <div class="col-md-2">
        <select class="form-control" id="diddle" (change)="onSelect($event)">
          <option>4</option>
          <option>8</option>
          <option>16</option>
          <option>24</option>
        </select>
      </div>
    </div>
    `
})
export class AppPagerComponent {

  private _pager: Pager = new Pager({});

  @Output()
  public setPage: EventEmitter<any> = new EventEmitter();

  constructor(private apiService: ApiService) {
    apiService.pager$.subscribe(_pager => {
      this._pager = _pager;
    });
  }

  private _pageChange(page: number) {
      if (page < 1 || page > this._pager.totalPages) {
          return;
      }
      this.setPage.emit([page, 4]);
  }

  private onSelect(pageSize: any) {
    event.preventDefault();
    this.setPage.emit([1,pageSize.target.value]);
  }
}
