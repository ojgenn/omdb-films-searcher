import { Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { FavoritesService } from '@app/services/favorites.service';
import { OmdbResponseContent } from '@app/commons/interfaces/omdb-response-content.interface';
import { SearchFilmsService } from '@app/services/search-films.service';
import { FilmsSearchResponseType } from '@app/commons/enums/films-search-response-type.enum';
import { FilmDetailsComponent, FilmDetailsMode } from '@app/pages/film-details/film-details.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnDestroy {

  favoritesList$: Observable<Array<OmdbResponseContent>>;
  showSpinner = false;
  private _dialogRefSubscription: Subscription;
  private _searchFilmDetailsSubscription: Subscription;

  constructor(public favoritesService: FavoritesService,
              private _searchFilmsService: SearchFilmsService,
              private _toast: ToastrService,
              private _dialog: MatDialog) { }

  deleteFilm(id: OmdbResponseContent['imdbID']): void {
    this.favoritesService.removeFromFavorites(id);
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
              mode: FilmDetailsMode.ReadyToRemove,
            },
          });

          this._dialogRefSubscription = dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.deleteFilm(result.id);
            }
          });

        },
        err => {
          this.showSpinner = false;
          console.error(err);
        },
      );
  }

  ngOnDestroy() {
    if (this._dialogRefSubscription) {
      this._dialogRefSubscription.unsubscribe();
    }
    if (this._searchFilmDetailsSubscription) {
      this._searchFilmDetailsSubscription.unsubscribe();
    }
  }


}
