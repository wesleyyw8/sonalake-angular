import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterEditComponent } from './character-edit.component';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { DataService } from '../core/data.service';

describe('CharacterEditComponent', () => {
  let component: CharacterEditComponent;
  let fixture: ComponentFixture<CharacterEditComponent>;
  let mockDataService;
  let mockRouter;

  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockDataService = jasmine.createSpyObj(['getCharacter', 'getAllSpecies', 'createCharacter', 'updateCharacter']);
    TestBed.configureTestingModule({
      declarations: [CharacterEditComponent],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: convertToParamMap({
              id: '0'
            })
          }
        }
      }, {
        provide: DataService,
        useValue: mockDataService
      }, {
        provide: Router,
        useValue: mockRouter
      }],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const character = {
      'id': 0,
      'name': '',
      'species': '',
      'gender': '',
      'homeworld': ''
    };
    const species = ['aaa', 'bbb'];
    fixture = TestBed.createComponent(CharacterEditComponent);
    component = fixture.componentInstance;

    mockDataService.getCharacter.and.returnValue(of(character));
    mockDataService.getAllSpecies.and.returnValue(of(species));
    mockDataService.createCharacter.and.returnValue(of(true));
    mockDataService.updateCharacter.and.returnValue(of(true));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if form is invalid createCharacter or updateCharacter should not be called', () => {
    const submitBtn = fixture.nativeElement.querySelectorAll('.btn.btn-primary')[0];
    fixture.whenStable().then(() => {
      submitBtn.click();
      expect(mockDataService.createCharacter).toHaveBeenCalledTimes(0);
      expect(mockDataService.updateCharacter).toHaveBeenCalledTimes(0);
    });
  });

  it('if form is valid updateCharacter should be called', () => {
    const submitBtn = fixture.nativeElement.querySelectorAll('.btn.btn-primary')[0];
    const nameInput = fixture.nativeElement.querySelectorAll('#name')[0];
    component.character.name = 'test';
    component.character.species = 'test2';
    component.character.gender = 'test123';
    fixture.detectChanges();
    fixture.whenStable().then(() => {

      submitBtn.click();
      expect(mockDataService.createCharacter).toHaveBeenCalledTimes(1);
      expect(mockDataService.updateCharacter).toHaveBeenCalledTimes(0);
    });
  });
});
