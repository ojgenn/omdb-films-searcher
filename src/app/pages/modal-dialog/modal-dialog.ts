import { MatDialog, MatDialogRef } from '@angular/material';
import { EventEmitter, OnDestroy, Output } from '@angular/core';

import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { OmdbResponseContent } from '@app/commons/interfaces/omdb-response-content.interface';
import { FilmsSearchResponseType } from '@app/commons/enums/films-search-response-type.enum';
import { FilmDetailsComponent, FilmDetailsMode } from '@app/pages/film-details/film-details.component';
import { SearchFilmsService } from '@app/services/search-films.service';
import { ObservableHandler } from '@app/utils/observable-handler';
import { FavoritesService } from '@app/services/favorites.service';

export class ModalDialog implements OnDestroy {
  @Output() addToFavorite: EventEmitter<OmdbResponseContent['imdbID']> = new EventEmitter<OmdbResponseContent['imdbID']>();

  showSpinner = false;
  favListIds: Array<OmdbResponseContent['imdbID']>;
  mode = FilmDetailsMode.ShowToAdd;
  private _searchFilmDetailsSubscription: Subscription;
  private _dialogRefSubscription: Subscription;
  private _favList$$ = new ObservableHandler(
    this.favoritesService.favoritesList.observable,
    this.initFavList.bind(this),
  );

  constructor(public searchFilmsService: SearchFilmsService,
              public dialog: MatDialog,
              public favoritesService: FavoritesService,
              public toast: ToastrService) {

  }

  showFilmDetails(id: OmdbResponseContent['imdbID']): void {
    this.showSpinner = true;
    this._searchFilmDetailsSubscription = this.searchFilmsService
      .getFilmById(id)
      .subscribe(res => {
          this.showSpinner = false;
          if (res.Response === FilmsSearchResponseType.False) {
            this.toast.error('Ошибка (список будет расширен', '', {
              timeOut: 2000,
            });
            return;
          }

          const dialogRef: MatDialogRef<FilmDetailsComponent> = this.dialog.open(FilmDetailsComponent, {
            width: '400px',
            data: {
              res,
              mode: this.mode,
              favoriteList: this._favList$$.latestValue,
            },
          });

          this._dialogRefSubscription = dialogRef.afterClosed()
            .subscribe((result: { mode: FilmDetailsMode; id: OmdbResponseContent['imdbID'] }) => {
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

  addFilmToFavorites(id: OmdbResponseContent['imdbID']): void {
    this.addToFavorite.emit(id);
  }

  removeFilmFromFavorites(id: OmdbResponseContent['imdbID']): void {
    this.favoritesService.removeFromFavorites(id);
  }

  initFavList(favList: Array<OmdbResponseContent>): void {
    this.favListIds = favList ? favList.map(item => item.imdbID) : [];
  }

  ngOnDestroy() {

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
