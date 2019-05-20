import { FilmType } from '@app/commons/enums/film-type.enum';

export interface OmdbResponseContent {
  Poster: string;
  Title: string;
  Type: FilmType;
  Year: string;
  imdbID: string;
  Director?: string;
  Country?: string;
}
