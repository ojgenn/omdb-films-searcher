import { OmdbResponseContent } from './omdb-response-content.interface';
import { FilmsSearchResponseType } from '@app/commons/enums/films-search-response-type.enum';

export interface OmdbSearchResults {
  Response: FilmsSearchResponseType;
  Error?: string;
  totalResults?: number;
  Search: Array<OmdbResponseContent>;
}
