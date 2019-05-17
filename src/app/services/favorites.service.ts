import { Injectable } from '@angular/core';

import { LocalStorage } from './local-storage.service';
import { SubjectHandler } from '../utils/subject-handler';
import { OmdbResponseContent } from '../commons/interfaces/omdb-response-content.interface';

@Injectable({
  providedIn: 'root',
})

export class FavoritesService {
  favoritesList = new SubjectHandler<Array<OmdbResponseContent>>();

  constructor(private _localStorageService: LocalStorage) {
    const favorites = this._localStorageService.getItem('favorites') as Array<OmdbResponseContent>;
    if (favorites) {
      this.favoritesList.emit(favorites);
    }
  }

  addToFavorites(film: OmdbResponseContent): void {
    let favorites = this.favoritesList.value;
    if (!favorites) {
      favorites = [];
    }
    favorites.push(film);
    this._localStorageService.setItem('favorites', favorites);
    this.favoritesList.emit(favorites);
  }
}
