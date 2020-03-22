import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'sl-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() pagination;
  @Output() setPageParent: EventEmitter<string> = new EventEmitter();
  pages = [];
  constructor() { }

  ngOnChanges() {
    if (!this.pagination) {
      return;
    }
    this.pages = [];
    this.pagination.forEach(item => {
      if (item !== '') {
        this.pages.push({
          url: item.trim().match(/^<(.*)>/)[1],
          label: item.trim().match(/rel="([a-z]*)"$/)[1]
        });
      }
    });
  }

  setPage(url) {
    this.setPageParent.emit(url);
  }
}
