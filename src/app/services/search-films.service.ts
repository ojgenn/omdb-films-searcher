import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { OmdbSearchResults } from '@app/commons/interfaces/omdb-search-results.interface';
import { OmdbResponseContent } from '@app/commons/interfaces/omdb-response-content.interface';

const BASE_URL = 'http://www.omdbapi.com/?apikey=5d04a1ad';

@Injectable({
  providedIn: 'root',
})

export class SearchFilmsService {
  constructor(private _http: HttpClient) {}

  getFilms(searchString: string, year?: number, pageNumber?: number): Observable<OmdbSearchResults> {
    let query = `s=${searchString}`;
    if (year) {
      query += `&y=${year}`;
    }
    if (pageNumber) {
      query += `&page=${pageNumber}`;
    }
    return this._http.get<OmdbSearchResults>(`${BASE_URL}&${query}`);
  }

  getFilmById(id: OmdbResponseContent['imdbID']): Observable<any> {
    return this._http.get<any>(`${BASE_URL}&plot=full&i=${id}`);
  }

}
