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
    component.pagination = [
      `<http://localhost:3000/characters?_page=1&_limit=10>; rel="first"`,
      `<http://localhost:3000/characters?_page=2&_limit=10>; rel="next"`,
      `<http://localhost:3000/characters?_page=2&_limit=10>; rel="last"`];

    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 3 pagination li', () => {
    const li = fixture.nativeElement.querySelectorAll('.page-item');
    expect(li.length).toBe(3);
  });
});
