import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { ToastrModule } from 'ngx-toastr';
import {
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatRadioModule,
  MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
  MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule, MatTabsModule,
  MatToolbarModule, MatTooltipModule, MatButtonToggleModule, MatExpansionModule, MatDividerModule, MatChipsModule, MatPaginatorModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './pages/search/search.component';
import { HeaderComponent } from './pages/header/header.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { FavoriteFilmDetailsComponent } from './pages/favorites/favorite-film-details/favorite-film-details.component';

const COMPONENTS = [
  AppComponent,
  SearchComponent,
  HeaderComponent,
  SearchResultsComponent,
  FavoritesComponent,
  PageNotFoundComponent,
  FavoriteFilmDetailsComponent,
];

const IMPORTS = [
  BrowserModule,
  AppRoutingModule,
  FormsModule,
  ToastrModule.forRoot(),
  HttpClientModule,
  BrowserAnimationsModule,
  ScrollingModule,
  ReactiveFormsModule,
];

const MATERIAL_MODULES = [
  MatButtonModule, MatListModule, MatIconModule, MatCardModule,
  MatMenuModule, MatInputModule, MatTooltipModule, MatProgressBarModule,
  MatGridListModule, MatSlideToggleModule, MatCheckboxModule, MatDialogModule, MatPaginatorModule,
  MatToolbarModule, MatFormFieldModule, MatAutocompleteModule, MatSelectModule,
  MatProgressSpinnerModule, MatTabsModule, MatButtonToggleModule, MatExpansionModule,
  MatDividerModule, MatChipsModule, MatRadioModule,
];

@NgModule({
  declarations: [
    COMPONENTS,
  ],
  imports: [
    IMPORTS,
    MATERIAL_MODULES,
  ],
  entryComponents: [FavoriteFilmDetailsComponent],
  exports: [MATERIAL_MODULES],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
