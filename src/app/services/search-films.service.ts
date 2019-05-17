import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { OmdbSearchResults } from '../commons/interfaces/omdb-search-results.interface';

const BASE_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=5d04a1ad';

@Injectable({
  providedIn: 'root',
})

export class SearchFilmsService {
  constructor(private _http: HttpClient) {}

  getFilms(searchString: string, year?: number): Observable<OmdbSearchResults> {
    let query = `s=${searchString}`;
    if (year) {
      query += `&y=${year}`;
    }
    return this._http.get<OmdbSearchResults>(`${BASE_URL}&${query}`);
  }

}
