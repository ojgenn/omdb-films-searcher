import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { FavoritesService } from '../../services/favorites.service';
import { OmdbResponseContent } from '../../commons/interfaces/omdb-response-content.interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favoritesList$: Observable<Array<OmdbResponseContent>>
  constructor(public favoritesService: FavoritesService) { }

  ngOnInit() {
  }

  deleteFilm(id: OmdbResponseContent['imdbID']): void {
    this.favoritesService.removeFromFavorites(id);
  }
}
