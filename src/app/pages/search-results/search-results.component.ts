import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OmdbResponseContent } from '../../commons/interfaces/omdb-response-content.interface';
import { FavoritesService } from '../../services/favorites.service';
import { ObservableHandler } from '../../utils/observable-handler';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {

  @Input() filmsList: Array<OmdbResponseContent>;
  @Input() total: number;
  @Input() length: number;
  @Input() pageSize: number;
  @Output() addToFavorite: EventEmitter<OmdbResponseContent['imdbID']> = new EventEmitter<OmdbResponseContent['imdbID']>();
  @Output() removeFilmFormFav: EventEmitter<OmdbResponseContent['imdbID']> = new EventEmitter<OmdbResponseContent['imdbID']>();
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  favListIds: Array<OmdbResponseContent['imdbID']>;

  private _favList$$ = new ObservableHandler(
    this._favoritesService.favoritesList.observable,
    this._initFavList.bind(this)
  );

  constructor(private _favoritesService: FavoritesService) {
    this._favoritesService.favoritesList.reEmit();
  }

  addFilmToFavorites(id: OmdbResponseContent['imdbID']): void {
    this.addToFavorite.emit(id);
  }

  removeFilmFromFavorites(id: OmdbResponseContent['imdbID']): void {
    this.removeFilmFormFav.emit(id);
  }

  onPaginatorChanged(e): void {
    const pageIndex = e.pageIndex;
    const previousIndex = e.previousPageIndex;
    if (!previousIndex && pageIndex === 1) {
      this.pageChanged.emit(pageIndex + 1);
      return;
    }
    this.pageChanged.emit(pageIndex + 1);
  }

  trackByFn(index: number, item: OmdbResponseContent): OmdbResponseContent['imdbID'] {
    return item.imdbID;
  }

  private _initFavList(favList: Array<OmdbResponseContent>): void {
    if (favList) {
      this.favListIds = favList.map(item => item.imdbID);
      console.log(this.favListIds);
    }
  }

}
