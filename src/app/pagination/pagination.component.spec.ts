import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.pager = {
      currentPage: 1,
      pages: [1, 2, 3, 4],
      endPage: 4
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if current page is 1, previous button should be disabled', () => {
    const pagination = fixture.nativeElement.querySelectorAll('.pagination')[0];
    const firstLi = pagination.children[0];
    expect(firstLi.className.includes('disabled')).toBeTruthy();
  });

  it('if current page is the end page, next button should be disabled', () => {
    component.pager.currentPage = 4;
    fixture.detectChanges();
    const pagination = fixture.nativeElement.querySelectorAll('.pagination')[0];
    const lastLi = pagination.children[pagination.children.length - 1];
    expect(lastLi.className.includes('disabled')).toBeTruthy();
  });
});
