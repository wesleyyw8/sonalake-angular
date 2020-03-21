import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Character } from './character';
import { catchError, tap } from 'rxjs/operators';
import { Specie } from './species';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  charactersBaseUrl = `http://localhost:3000/characters`;
  speciesBaseUrl = 'http://localhost:3000/species';

  constructor(private http: HttpClient) { }

  getAllCharacters(wordToMatch: string = ''): Observable<Character[]> {
    let url = this.charactersBaseUrl;
    if (wordToMatch !== '') {
      url = `${this.charactersBaseUrl}?q=${wordToMatch}`;
    }
    return this.http.get<Character[]>(url)
      .pipe(
        catchError(err => throwError(err))
      );
  }

  deleteCharacterById(id: string): Observable<any> {
    return this.http.delete<Character[]>(`${this.charactersBaseUrl}/${id}`)
      .pipe(
        catchError(err => throwError(err))
      );
  }

  getCharacter(id: number): Observable<Character> {
    if (id === 0) {
      return of(this.initializeCharacter());
    }
    const url = `${this.charactersBaseUrl}/${id}`;
    return this.http.get<Character>(url)
      .pipe(
        catchError(err => throwError(err))
      );
  }

  getAllSpecies(): Observable<Specie[]> {
    return this.http.get<Specie[]>(this.speciesBaseUrl)
      .pipe(
        catchError(err => throwError(err))
      );
  }

  private initializeCharacter(): Character {
    return {
      id: 0,
      name: '',
      species: '',
      gender: 'male',
      homeworld: ''
    };
  }
}

