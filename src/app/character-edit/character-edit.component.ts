import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../core/data.service';
import { Character } from '../core/character';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'sl-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.scss']
})
export class CharacterEditComponent implements OnInit {
  errorMessage: string;
  character: Character = {
    id: 0,
    name: '',
    species: '',
    gender: 'male',
    homeworld: ''
  };
  pageTitle: string;
  postError = false;
  postErrorMessage = '';
  species = [];

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.getSpecies();
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param || 0;
      this.getProduct(id);
    }
  }

  private getSpecies() {
    this.dataService.getAllSpecies()
      .subscribe({
        next: (species) => this.species = species,
        error: err => this.errorMessage = err
      });
  }

  private getProduct(id: number): void {
    this.dataService.getCharacter(id)
      .subscribe({
        next: (character: Character) => this.configPage(character),
        error: err => this.errorMessage = err
      });
  }

  private configPage(character: Character) {
    this.character = character;
    if (this.character.id === 0) {
      this.pageTitle = 'Add a new Character';
    } else {
      this.pageTitle = `Edit Character: ${this.character.name}`;
    }
  }

  onBlur(field) {
    console.log('in Onblur ', field.valid);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.character.id === 0) {
        this.dataService.createCharacter(this.character).subscribe({
          next: () => this.onSaveComplete(`The new ${this.character.name} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        this.dataService.updateCharacter(this.character).subscribe({
          next: () => this.onSaveComplete(`The new ${this.character.name} was updated`),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.postError = true;
      this.postErrorMessage = 'Fix the above errors';
    }
  }

  onSaveComplete(message?: string): void {
    console.log(message);
    this.router.navigate(['/list']);
  }
}
