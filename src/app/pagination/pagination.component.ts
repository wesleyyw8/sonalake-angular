import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sl-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() pager;
  @Output() setPageParent: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  setPage(page) {
    this.setPageParent.emit(page);
  }
}
