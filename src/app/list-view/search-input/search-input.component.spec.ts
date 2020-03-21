import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event after keyup event is triggered', fakeAsync(() => {
    spyOn(component.setValue, 'emit');
    const input = fixture.nativeElement.querySelectorAll('input.form-control')[0];
    const event = new KeyboardEvent('keyup', {
      bubbles: true, cancelable: true, shiftKey: false
    });
    input.value = 'abc';
    input.dispatchEvent(event);
    tick(750);
    expect(component.setValue.emit).toHaveBeenCalled();
  }));
});
