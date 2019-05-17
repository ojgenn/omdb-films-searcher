import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/operators';

import { LocalStorage } from '../../services/local-storage.service';
import { SearchFilmsService } from '../../services/search-films.service';
import { OmdbSearchResults } from '../../commons/interfaces/omdb-search-results.interface';
import { FilmsSearchResponseType } from '../../commons/enums/films-search-response-type.enum';
import { OmdbResponseContent } from '../../commons/interfaces/omdb-response-content.interface';
import { safeDetectChanges } from '../../utils/safe-detect-changes';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {

  filmsSelectData = SearchComponent.initYearsArray();
  searchForm: FormGroup = this._initSearchForm();
  options: Array<string> = this._initOptions();
  filteredOptions: Observable<string[]>;
  filmsList: Array<OmdbResponseContent> = [];
  errors = false;

  private _searchFilmsSubscription$: Subscription;

  constructor(private _formBuilder: FormBuilder,
              private _cdr: ChangeDetectorRef,
              private _searchFilm: SearchFilmsService,
              private _localStorageService: LocalStorage) {}

  static initYearsArray(): { currentYear: number, array: Array<number> } {
    const currentYear = new Date().getFullYear();
    const array = [];
    for (let i = 1986; i <= currentYear; i++) {
      array.push(i);
    }
    return { currentYear, array: array.reverse() };
  }

  ngOnInit() {
    this.filteredOptions = this.searchForm.controls.filmName.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value)),
    );
  }

  searchFilm() {
    const filmName = this.searchForm.controls.filmName.value;
    const year = Number(this.searchForm.controls.year.value);
    this._prepareAndSaveOptions(filmName);
    this._searchFilmsSubscription$ = this._searchFilm
      .getFilms(filmName, year !== 0 ? year : undefined)
      .subscribe((res: OmdbSearchResults) => {
        if (res.Response === FilmsSearchResponseType.True) {
          this.filmsList = res.Search;
          this.errors = false;
        } else {
          this.errors = true;
          this.filmsList = [];
        }
        safeDetectChanges(this._cdr);
      });
  }

  addFilmToFavorite(id: OmdbResponseContent['imdbID']): void {
    console.log(id);
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
