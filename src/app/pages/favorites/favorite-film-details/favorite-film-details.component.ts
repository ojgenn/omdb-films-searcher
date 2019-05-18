import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-favorite-film-details',
  templateUrl: './favorite-film-details.component.html',
  styleUrls: ['./favorite-film-details.component.scss']
})
export class FavoriteFilmDetailsComponent {

  constructor(public dialogRef: MatDialogRef<FavoriteFilmDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  close(): void {
    this.dialogRef.close();
  }
}
