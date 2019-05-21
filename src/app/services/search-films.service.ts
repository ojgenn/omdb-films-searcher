import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { OmdbSearchResults } from '@app/commons/interfaces/omdb-search-results.interface';
import { OmdbResponseContent } from '@app/commons/interfaces/omdb-response-content.interface';
import { FilmsSearchResponseType } from '@app/commons/enums/films-search-response-type.enum';

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
    return this._http.get<OmdbSearchResults>(`${BASE_URL}&${query}`)
      .pipe(
        map(item => {
          if (item.Response === FilmsSearchResponseType.True && item.Search.length > 0) {
            // фильтруем неуникальные
            const mappedSearch = {};
            item.Search.forEach(search => mappedSearch[search.imdbID] = search);
            item.Search = Object.values(mappedSearch);
          }
          return item;
        })
      );
  }

  getFilmById(id: OmdbResponseContent['imdbID']): Observable<any> {
    return this._http.get<any>(`${BASE_URL}&plot=full&i=${id}`);
  }

}
