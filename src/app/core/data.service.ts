import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Character } from './character';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = `http://localhost:3000/characters`;
  constructor(private http: HttpClient) { }

  getAllCharacters(wordToMatch: string = ''): Observable<Character[]> {
    let url = this.baseUrl;
    if (wordToMatch !== '') {
      url = `${this.baseUrl}?q=${wordToMatch}`;
    }
    return this.http.get<Character[]>(url)
      .pipe(
        catchError(err => throwError(err))
      );
  }

  deleteCharacterById(id: string): Observable<any> {
    return this.http.delete<Character[]>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(err => throwError(err))
      );
  }

  getCharacter(id: number): Observable<Character> {
    if (id === 0) {
      return of(this.initializeCharacter());
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Character>(url)
      .pipe(
        tap(data => console.log('getProduct: ' + JSON.stringify(data))),
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

