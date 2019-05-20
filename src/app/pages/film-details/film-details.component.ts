import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export enum FilmDetailsMode {
  ShowToAdd,
  ReadyToRemove,
}

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss']
})
export class FilmDetailsComponent {

  filmDetailsMode = FilmDetailsMode;

  constructor(public dialogRef: MatDialogRef<FilmDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    if (this.data.favoriteList) {
      const isFilmOnFavoriteList = this.data.favoriteList.find(item => item.imdbID === this.data.res.imdbID);
      if (isFilmOnFavoriteList) {
        this.data.mode = FilmDetailsMode.ReadyToRemove;
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
