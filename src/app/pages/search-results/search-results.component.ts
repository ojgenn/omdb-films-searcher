import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OmdbResponseContent } from '../../commons/interfaces/omdb-response-content.interface';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {

  @Input() filmsList: Array<OmdbResponseContent>;
  @Input() total: number;
  @Input() length: number;
  @Input() pageSize: number;
  @Output() addToFavorite: EventEmitter<OmdbResponseContent['imdbID']> = new EventEmitter<OmdbResponseContent['imdbID']>();
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  addFilmToFavorites(id: OmdbResponseContent['imdbID']): void {
    this.addToFavorite.emit(id);
  }

  onPaginatorChanged(e): void {
    const pageIndex = e.pageIndex;
    const previousIndex = e.previousPageIndex;
    if (!previousIndex && pageIndex === 1) {
      this.pageChanged.emit(pageIndex + 1);
      return;
    }
    this.pageChanged.emit(pageIndex + 1);
  }

  trackByFn(index: number, item: OmdbResponseContent): OmdbResponseContent['imdbID'] {
    return item.imdbID;
  }

}
