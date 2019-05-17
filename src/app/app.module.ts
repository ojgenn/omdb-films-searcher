import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatRadioModule,
  MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
  MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule, MatTabsModule,
  MatToolbarModule, MatTooltipModule, MatButtonToggleModule, MatExpansionModule, MatDividerModule, MatChipsModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './pages/search/search.component';
import { HeaderComponent } from './pages/header/header.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';

const COMPONENTS = [
  AppComponent,
  SearchComponent,
  HeaderComponent,
  SearchResultsComponent,
];

const IMPORTS = [
  BrowserModule,
  AppRoutingModule,
  FormsModule,
  HttpClientModule,
  BrowserAnimationsModule,
  ScrollingModule,
  ReactiveFormsModule,
];

const MATERIAL_MODULES = [
  MatButtonModule, MatListModule, MatIconModule, MatCardModule,
  MatMenuModule, MatInputModule, MatTooltipModule, MatProgressBarModule,
  MatGridListModule, MatSlideToggleModule, MatCheckboxModule, MatDialogModule,
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
  exports: [MATERIAL_MODULES],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
