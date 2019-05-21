import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './pages/search/search.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    data: { title: 'Поиск фильмов' }
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    data: { title: 'Избранное' }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: '404' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
