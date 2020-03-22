import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewComponent } from './list-view.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataService } from '../core/data.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('ListViewComponent', () => {
  let component: ListViewComponent;
  let fixture: ComponentFixture<ListViewComponent>;
  let mockDataService;
  let mockRouter;

  beforeEach(async(() => {
    mockDataService = jasmine.createSpyObj(['getAllCharacters', 'deleteCharacterById']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    TestBed.configureTestingModule({
      declarations: [ListViewComponent],
      providers: [{
        provide: DataService,
        useValue: mockDataService
      }, {
        provide: Router,
        useValue: mockRouter
      }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const characters = [{
      'id': 1,
      'name': 'Luke Skywalker',
      'species': 'Human',
      'gender': 'male',
      'homeworld': 'Tatooine'
    },
    {
      'id': 2,
      'name': 'C-3PO',
      'species': 'Droid',
      'gender': 'n/a',
      'homeworld': 'Tatooine'
    }];

    fixture = TestBed.createComponent(ListViewComponent);
    component = fixture.componentInstance;
    mockDataService.getAllCharacters.and.returnValue(of(characters));
    mockDataService.deleteCharacterById.and.returnValue(of(true));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a table of characters with 2 rows', () => {
    const table = fixture.nativeElement.querySelectorAll('.table tbody tr');
    expect(table.length).toBe(2);
  });

  it('should call deleteCharacterById of dataService in case user presses the delete button', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const deleteBtn = fixture.nativeElement.querySelectorAll('.table tbody tr .fa.fa-trash-o')[0];
    deleteBtn.click();
    expect(mockDataService.deleteCharacterById).toHaveBeenCalled();
  });
});
