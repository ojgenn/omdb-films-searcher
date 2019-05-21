import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator } from '@angular/material';

import { OmdbResponseContent } from '@app/commons/interfaces/omdb-response-content.interface';
import { FavoritesService } from '@app/services/favorites.service';
import { ModalDialog } from '@app/pages/modal-dialog/modal-dialog';
import { SearchFilmsService } from '@app/services/search-films.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent extends ModalDialog implements OnDestroy {
  @ViewChild('paginator') paginator: MatPaginator;
  @Input() filmsList: Array<OmdbResponseContent>;
  @Input() total: number;
  @Input() pageSize: number;

  @Input() set newSearch(newSearch: boolean) {
    if (newSearch) {
      this.paginator.pageIndex = 0;
    }
  }

  @Output() removeFilmFormFav: EventEmitter<OmdbResponseContent['imdbID']> = new EventEmitter<OmdbResponseContent['imdbID']>();
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();


  constructor(public searchFilmsService: SearchFilmsService,
              public dialog: MatDialog,
              public favoritesService: FavoritesService,
              public toast: ToastrService) {
    super (searchFilmsService, dialog, favoritesService, toast);
    this.favoritesService.favoritesList.reEmit();
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

  ngOnDestroy(): void {
  }

}
