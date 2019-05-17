import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=5d04a1ad';

@Injectable({
  providedIn: 'root',
})

export class SearchFilmsService {
  constructor(private _http: HttpClient) {}

  getFilms(searchString: string, year?: number) {
    let query = `s=${searchString}`;
    if (year) {
      query += `&y=${year}`;
    }
    return this._http.get(`${BASE_URL}&${query}`);
  }

}
