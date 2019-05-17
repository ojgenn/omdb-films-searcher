import { FilmType } from '../enums/film-type.enum';

export interface OmdbResponseContent {
  Poster: string;
  Title: string;
  Type: FilmType;
  Year: string;
  imdbID: string;
}
