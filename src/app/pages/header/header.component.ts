import { Component } from '@angular/core';

import { FavoritesService } from '@app/services/favorites.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public favoritesService: FavoritesService) { }

}
