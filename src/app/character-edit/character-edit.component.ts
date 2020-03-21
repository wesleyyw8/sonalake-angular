import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

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
      this.pageTitle = 'Add Character';
    } else {
      this.pageTitle = `Edit Character: ${this.character.name}`;
    }
  }

  onBlur(field) {
    console.log('in Onblur ', field.valid);
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (form.valid) {
      console.log('form is valid');
    } else {
      this.postError = true;
      this.postErrorMessage = 'Fix the above errors';
    }
  }
}
