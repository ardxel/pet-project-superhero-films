interface MovieNames {
  nameRu: string;
  nameOriginal: string;
}
interface ImgUrls {
  posterUrl: string;
  posterUrlPreview: string;
  coverUrl?: string | null;
  logoUrl?: string | null;
}
interface Ratings {
  ratingGoodReview: number;
  ratingKinopoisk: number;
  ratingImdb: number;
  ratingFilmCritics: number;
  ratingAwait: number;
}

interface TextDesc {
  slogan: string;
  description: string;
  shortDescription?: string | null;
}

interface RatingLimits extends Ratings{
  ratingMpaa: string,
  ratingAgeLimits: string,
}

type Country = {country: string};

type Genre = {genre: string};

export default interface IMovie extends
  MovieNames,
  ImgUrls,
  RatingLimits,
  TextDesc {
  id: number,
  comic: string,
  phase?: number,
  kinopoiskId: number,
  imdbId: string,
  countries: Country[],
  genres: Genre[],
  webUrl: string,
  year: number,
  filmLength: number
  type: string,
  serial: boolean,
  shortFilm: boolean,
  completed: boolean,
  hasImax: boolean,
  has3D: boolean
}
