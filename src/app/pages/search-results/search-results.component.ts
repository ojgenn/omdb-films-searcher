import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator } from '@angular/material';

import { OmdbResponseContent } from '@app/commons/interfaces/omdb-response-content.interface';
import { FavoritesService } from '@app/services/favorites.service';
import { ObservableHandler } from '@app/utils/observable-handler';
import { FilmsSearchResponseType } from '@app/commons/enums/films-search-response-type.enum';
import { FilmDetailsComponent, FilmDetailsMode } from '@app/pages/film-details/film-details.component';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SearchFilmsService } from '@app/services/search-films.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnDestroy {
  @ViewChild('paginator') paginator: MatPaginator;
  @Input() filmsList: Array<OmdbResponseContent>;
  @Input() total: number;
  @Input() pageSize: number;

  @Input() set newSearch(newSearch: boolean) {
    if (newSearch) {
      this.paginator.pageIndex = 0;
    }
  }

  @Output() addToFavorite: EventEmitter<OmdbResponseContent['imdbID']> = new EventEmitter<OmdbResponseContent['imdbID']>();
  @Output() removeFilmFormFav: EventEmitter<OmdbResponseContent['imdbID']> = new EventEmitter<OmdbResponseContent['imdbID']>();
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  showSpinner = false;
  favListIds: Array<OmdbResponseContent['imdbID']>;

  private _favList$$ = new ObservableHandler(
    this._favoritesService.favoritesList.observable,
    this._initFavList.bind(this),
  );
  private _searchFilmDetailsSubscription: Subscription;
  private _dialogRefSubscription: Subscription;

  constructor(private _favoritesService: FavoritesService,
              private _toast: ToastrService,
              private _searchFilmsService: SearchFilmsService,
              private _dialog: MatDialog) {
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

  showFilmDetails(id: OmdbResponseContent['imdbID']): void {
    this.showSpinner = true;
    this._searchFilmDetailsSubscription = this._searchFilmsService
      .getFilmById(id)
      .subscribe(res => {
          this.showSpinner = false;
          if (res.Responce === FilmsSearchResponseType.False) {
            this._toast.error('Ошибка (список будет расширен', '', {
              timeOut: 2000,
            });
            return;
          }

          const dialogRef: MatDialogRef<FilmDetailsComponent> = this._dialog.open(FilmDetailsComponent, {
            width: '400px',
            data: {
              res,
              mode: FilmDetailsMode.ShowToAdd,
              favoriteList: this._favList$$.latestValue,
            },
          });

          this._dialogRefSubscription = dialogRef.afterClosed().subscribe(result => {
            if (result) {
              if (result.mode === FilmDetailsMode.ShowToAdd) {
                this.addFilmToFavorites(result.id);
              } else {
                this.removeFilmFromFavorites(result.id);
              }
            }
          });

        },
        err => {
          this.showSpinner = false;
          console.error(err);
        },
      );
  }

  private _initFavList(favList: Array<OmdbResponseContent>): void {
    this.favListIds = favList ? favList.map(item => item.imdbID) : [];
  }

  ngOnDestroy(): void {
    if (this._favList$$) {
      this._favList$$.kill();
    }
    if (this._dialogRefSubscription) {
      this._dialogRefSubscription.unsubscribe();
    }
    if (this._searchFilmDetailsSubscription) {
      this._searchFilmDetailsSubscription.unsubscribe();
    }
  }

}
