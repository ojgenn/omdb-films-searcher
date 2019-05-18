import { FilmsSearchResponseType } from '../enums/films-search-response-type.enum';
import { OmdbResponseContent } from './omdb-response-content.interface';

export interface OmdbSearchResults {
  Response: FilmsSearchResponseType;
  Error?: string;
  totalResults?: number;
  Search: Array<OmdbResponseContent>;
}
