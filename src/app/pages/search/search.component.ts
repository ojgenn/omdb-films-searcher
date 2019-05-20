import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/operators';

import { LocalStorage } from '@app/services/local-storage.service';
import { SearchFilmsService } from '@app/services/search-films.service';
import { OmdbSearchResults } from '@app/commons/interfaces/omdb-search-results.interface';
import { FilmsSearchResponseType } from '@app/commons/enums/films-search-response-type.enum';
import { OmdbResponseContent } from '@app/commons/interfaces/omdb-response-content.interface';
import { FavoritesService } from '@app/services/favorites.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {

  filmsSelectData = SearchComponent.initYearsArray();
  searchForm: FormGroup = this._initSearchForm();
  options: Array<string> = this._initOptions();
  filteredOptions: Observable<string[]>;
  filmsList: Array<OmdbResponseContent> = [];
  errors = false;
  length = 0;
  total = 0;
  pageSize = 0;
  newSearch: boolean;
  showSpinner = false;

  private _searchFilmsSubscription$: Subscription;

  constructor(private _formBuilder: FormBuilder,
              private _searchFilm: SearchFilmsService,
              private _favoritesService: FavoritesService,
              private _localStorageService: LocalStorage) {}

  static initYearsArray(): { currentYear: number, array: Array<any> } {
    const currentYear = new Date().getFullYear();
    let array = [];
    for (let i = 1986; i <= currentYear; i++) {
      array.push(i);
    }
    array = [...array, null].reverse();
    return { currentYear, array };
  }

  static getPageNumbers(total, lenght) {
    return ((total % lenght) > 0) ? (Math.floor(total / lenght) + 1) : (total / lenght);
  }

  ngOnInit() {
    this.filteredOptions = this.searchForm.controls.filmName.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value)),
    );
  }

  searchFilm(pageNumber?: number): void {
    this.showSpinner = true;
    this.newSearch = !pageNumber;
    const filmName = this.searchForm.controls.filmName.value;
    const year = Number(this.searchForm.controls.year.value);
    this._prepareAndSaveOptions(filmName);
    this._searchFilmsSubscription$ = this._searchFilm
      .getFilms(filmName, year !== 0 ? year : undefined, pageNumber)
      .subscribe((res: OmdbSearchResults) => {
          if (res.Response === FilmsSearchResponseType.True) {
            console.log(res);
            this.filmsList = res.Search;
            this.errors = false;
            this.total = res.totalResults;
            this.pageSize = res.Search.length;
            this.length = SearchComponent.getPageNumbers(this.total, this.pageSize);
            console.log(this.length);
            this.showSpinner = false;
          } else {
            this._catchErrors();
          }
        },
        err => {
          this._catchErrors();
          console.error(err);
        },
      );
  }

  addFilmToFavorite(id: OmdbResponseContent['imdbID']): void {
    const film = this.filmsList.find(item => item.imdbID === id);
    if (film) {
      this._favoritesService.addToFavorites(film);
    }
  }

  removeFilmFormFav(id: OmdbResponseContent['imdbID']): void {
    this._favoritesService.removeFromFavorites(id);
  }

  private _catchErrors(): void {
    this.errors = true;
    this.filmsList = [];
    this.total = 0;
    this.pageSize = 0;
    this.length = 0;
    this.showSpinner = false;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _initSearchForm(): FormGroup {
    return this._formBuilder.group({
      filmName: new FormControl('', [Validators.required]),
      year: new FormControl(''),
    });
  }

  private _initOptions(): Array<string> {
    const options = this._localStorageService.getItem('searchOptions');
    return options ? options as Array<string> : [];
  }

  private _prepareAndSaveOptions(filmName: string): void {

    const searchValue = this.options.find(item => item === filmName);
    if (!searchValue) {
      this.options.push(filmName);
    }

    this.options = this.options.sort();
    if (this.options.length > 50) {
      this.options.splice(0, 1);
    }

    this._localStorageService.setItem('searchOptions', this.options);
  }

  ngOnDestroy(): void {
    if (this._searchFilmsSubscription$) {
      this._searchFilmsSubscription$.unsubscribe();
    }
  }

}
