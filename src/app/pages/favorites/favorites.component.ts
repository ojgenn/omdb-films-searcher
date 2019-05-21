import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ToastrService } from 'ngx-toastr';

import { FavoritesService } from '@app/services/favorites.service';;
import { SearchFilmsService } from '@app/services/search-films.service';
import { ModalDialog } from '@app/pages/modal-dialog/modal-dialog';
import { FilmDetailsMode } from '@app/pages/film-details/film-details.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent extends ModalDialog {
  mode = FilmDetailsMode.ReadyToRemove;

  constructor(public searchFilmsService: SearchFilmsService,
              public dialog: MatDialog,
              public favoritesService: FavoritesService,
              public toast: ToastrService) {
    super(searchFilmsService, dialog, favoritesService, toast);
  }

}
