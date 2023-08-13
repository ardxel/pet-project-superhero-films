type PersonIdentity = {
  id: string;
  name: string;
};

interface Director extends PersonIdentity {
  description: string;
}

export interface IActor extends PersonIdentity {
  image: string;
  asCharacter: string;
}

interface FilmCrew {
  directors: Director[];
  actors: IActor[];
}

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
  slogan: string | null;
  description: string;
  shortDescription?: string | null;
}

interface RatingLimits extends Ratings {
  ratingMpaa: string;
  ratingAgeLimits: string | null;
}

type Country = { country: string };

type Genre = { genre: string };

export default interface IMovie
  extends MovieNames,
    ImgUrls,
    RatingLimits,
    TextDesc,
    FilmCrew {
  id: number;
  comic: string;
  phase?: number;
  videoUrls: string[];
  kinopoiskId: number;
  imdbId: string;
  countries: Country[];
  genres: Genre[];
  webUrl: string;
  year: number;
  filmLength: number;
  type: string;
  serial: boolean;
  shortFilm: boolean;
  completed: boolean;
  hasImax: boolean;
  has3D: boolean;
}
