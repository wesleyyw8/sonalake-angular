import { Character } from './../core/character';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../core/data.service';
import { takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'sl-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit, OnDestroy {
  constructor(private dataService: DataService, private router: Router) { }
  characters: Character[] = [];
  private componentIsActive = true;
  wordToSearch = '';
  pagination;

  ngOnDestroy() {
    this.componentIsActive = false;
  }
  ngOnInit() {
    this.loadData();
  }
  private loadData(page = 1, wordToMatch = '') {
    this.dataService.getAllCharacters(page, wordToMatch).pipe(takeWhile(() => this.componentIsActive)).subscribe(
      (data) => {
        this.pagination = data.headers ? data.headers.get('link').split(',') : [];
        this.characters = data.body;
      },
      err => console.log(err)
    );
  }

  setPage(url) {
    this.dataService.getAllCharactersByUrl(url).pipe(takeWhile(() => this.componentIsActive)).subscribe(
      (data) => {
        this.pagination = data.headers.get('link').split(',');
        this.characters = data.body;
      },
      err => console.log(err)
    );
  }

  searchByWord(wordToMatch) {
    this.wordToSearch = wordToMatch;
    this.loadData(1, wordToMatch);
  }

  deleteItem(character) {
    if (confirm('Are you sure to delete ' + character.name)) {
      this.dataService
        .deleteCharacterById(character.id)
        .pipe(takeWhile(() => this.componentIsActive)).subscribe(
          resp => {
            this.loadData(1, this.wordToSearch);
          }
        );
    }
  }

  onEditClick(id) {
    this.router.navigate(['/item', id]);
  }

  sortBy(value) {
    this.characters = this.characters.sort((a, b) => {
      const itemA = a[value];
      const itemB = b[value];
      if (itemA < itemB) {
        return -1;
      } else if (itemA > itemB) {
        return 1;
      }
      return 0;
    });
  }
}
