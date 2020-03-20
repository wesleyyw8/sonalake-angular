import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Character } from './character';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getAllCharacters(wordToMatch: string = ''): Observable<Character[]> {
    let url = `http://localhost:3000/characters`;
    if (wordToMatch !== '') {
      url = `${url}?q=${wordToMatch}`;
    }
    return this.http.get<Character[]>(url)
      .pipe(
        catchError(err => throwError(err))
      );
  }
}

