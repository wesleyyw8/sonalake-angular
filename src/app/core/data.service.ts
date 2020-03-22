import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getAllCharacters(page = 1, wordToMatch: string = ''): Observable<any> {
    let url = `${this.charactersBaseUrl}?_page=${page}&_limit=10`;

    if (wordToMatch !== '') {
      url += `&q=${wordToMatch}`;
    }
    return this.http.get<any>(url, { observe: 'response' })
      .pipe(
        catchError(err => throwError(err))
      );
  }

  getAllCharactersByUrl(url: string): Observable<any> {
    return this.http.get<any>(url, { observe: 'response' })
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

  createCharacter(character: Character): Observable<Character> {
    character.id = null;
    return this.http.post<Character>(this.charactersBaseUrl, character)
      .pipe(
        tap(data => console.log('createCharacter: ' + JSON.stringify(data))),
        catchError(err => throwError(err))
      );
  }

  updateCharacter(character: Character): Observable<Character> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Character>(`${this.charactersBaseUrl}/${character.id}`, character, { headers })
      .pipe(
        tap(data => console.log('update Character: ' + JSON.stringify(data))),
        catchError(err => throwError(err))
      );
  }

  private initializeCharacter(): Character {
    return {
      id: 0,
      name: '',
      species: '',
      gender: '',
      homeworld: ''
    };
  }
}

