import { Character } from './../core/character';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../core/data.service';
import { PageService } from '../core/page.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'sl-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit, OnDestroy {
  constructor(private dataService: DataService, private pageService: PageService) { }
  characters: Character[] = [];
  pager: any = {};
  charactersPaged: Character[];
  private componentIsActive = true;
  wordToSearch = '';

  ngOnDestroy() {
    this.componentIsActive = false;
  }
  ngOnInit() {
    this.loadData();
  }
  private loadData(wordToMatch = '') {
    this.dataService.getAllCharacters(wordToMatch).pipe(takeWhile(() => this.componentIsActive)).subscribe(
      (data) => {
        this.characters = data;
        this.setPage(1);
      },
      err => console.log(err)
    );
  }

  setPage(page: number) {
    if (page < 1) {
      return;
    }

    // get pager object from service
    this.pager = this.pageService.getPager(this.characters.length, page);

    // get current page of items
    this.charactersPaged = this.characters.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  searchByWord(wordToMatch) {
    this.wordToSearch = wordToMatch;
    this.loadData(wordToMatch);
  }

  deleteItem(character) {
    if (confirm('Are you sure to delete ' + character.name)) {
      this.dataService.deleteCharacterById(character.id).pipe(takeWhile(() => this.componentIsActive)).subscribe(
        resp => {
          this.loadData(this.wordToSearch);
        }
      );
    }
  }
}
