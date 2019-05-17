import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OmdbResponseContent } from '../../commons/interfaces/omdb-response-content.interface';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  @Input() filmsList: Array<OmdbResponseContent>;
  @Output() addToFavorite: EventEmitter<OmdbResponseContent['imdbID']> = new EventEmitter<OmdbResponseContent['imdbID']>();
  constructor() { }

  ngOnInit() {
  }

  addFilmToFavorites(id: OmdbResponseContent['imdbID']): void {
    this.addToFavorite.emit(id);
  }
}
