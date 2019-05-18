import { Injectable, OnDestroy } from '@angular/core';

import { LocalStorage } from './local-storage.service';
import { SubjectHandler } from '../utils/subject-handler';
import { OmdbResponseContent } from '../commons/interfaces/omdb-response-content.interface';
import { objectCopy } from '../utils/object-copy';

@Injectable({
  providedIn: 'root',
})

export class FavoritesService implements OnDestroy {
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
    const filmInCollection = favorites.find(item => item === film);
    if (!filmInCollection) {
      favorites.push(film);
      this._localStorageService.setItem('favorites', favorites);
      this.favoritesList.emit(favorites);
    }
  }

  removeFromFavorites(id: OmdbResponseContent['imdbID']): void {
    let favorites = objectCopy(this.favoritesList.value);
    if (favorites) {
      const index = favorites.findIndex(item => item.imdbID === id);
      if (favorites.length === 1) {
        favorites = [];
      } else {
        favorites.splice(index, 1);
      }
      this._localStorageService.setItem('favorites', favorites);
      this.favoritesList.emit(favorites);
    }
  }

  ngOnDestroy() {
    if (this.favoritesList) {
      this.favoritesList.complete();
    }
  }
}
