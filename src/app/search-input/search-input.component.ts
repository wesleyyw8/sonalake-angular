import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'sl-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit, OnDestroy {
  @Input() placeholder: string;
  @Output() setValue: EventEmitter<string> = new EventEmitter();

  private searchSubject: Subject<string> = new Subject();
  private componentIsActive = true;
  private lastSearch = '';

  constructor() { }

  ngOnInit(): void {
    this.setSearchSubscription();
  }

  private setSearchSubscription() {
    this.searchSubject.pipe(
      debounceTime(200),
      takeWhile(() => this.componentIsActive)
    ).subscribe((value: string) => {

      this.setValue.emit(value);
    });
  }

  public updateSearch(value) {
    if (value !== this.lastSearch) {
      this.lastSearch = value;
      this.searchSubject.next(value);
    }
  }

  ngOnDestroy() {
    this.componentIsActive = false;
  }

}
