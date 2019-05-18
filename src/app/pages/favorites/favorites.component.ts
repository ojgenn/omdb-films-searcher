import { Component, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { FavoritesService } from '../../services/favorites.service';
import { OmdbResponseContent } from '../../commons/interfaces/omdb-response-content.interface';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FavoriteFilmDetailsComponent } from './favorite-film-details/favorite-film-details.component';
import { SearchFilmsService } from '../../services/search-films.service';
import { FilmsSearchResponseType } from '../../commons/enums/films-search-response-type.enum';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnDestroy {

  favoritesList$: Observable<Array<OmdbResponseContent>>;
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
    this._searchFilmDetailsSubscription = this._searchFilmsService.getFilmById(id).subscribe(res => {
      if (res.Responce === FilmsSearchResponseType.False) {
        this._toast.error('Ошибка (список будет расширен', '', {
          timeOut: 2000,
        });
        return;
      }

      const dialogRef: MatDialogRef<FavoriteFilmDetailsComponent> = this._dialog.open(FavoriteFilmDetailsComponent, {
        width: '400px',
        data: {res}
      });

      this._dialogRefSubscription = dialogRef.afterClosed().subscribe(imdbID => {
        if (imdbID) {
          this.deleteFilm(imdbID);
        }
      });

    });
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
