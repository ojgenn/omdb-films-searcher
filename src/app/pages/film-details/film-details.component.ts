import { AfterViewChecked, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OmdbResponseContent } from '@app/commons/interfaces/omdb-response-content.interface';

export enum FilmDetailsMode {
  ShowToAdd,
  ReadyToRemove,
}

interface FilmDetailData {
  res: OmdbResponseContent;
  mode: FilmDetailsMode;
  favoriteList?: Array<OmdbResponseContent>;
}

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss']
})
export class FilmDetailsComponent implements AfterViewChecked {

  filmDetailsMode = FilmDetailsMode;

  constructor(public dialogRef: MatDialogRef<FilmDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: FilmDetailData) {
    if (this.data.favoriteList) {
      const isFilmOnFavoriteList = this.data.favoriteList.find(item => item.imdbID === this.data.res.imdbID);
      if (isFilmOnFavoriteList) {
        this.data.mode = FilmDetailsMode.ReadyToRemove;
      }
    }
  }

  ngAfterViewChecked() {
    const el = document.querySelector('#filmDetailContent');
    el.scrollIntoView();
  }

  close(): void {
    this.dialogRef.close();
  }
}
