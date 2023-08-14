import mongoose from 'mongoose';
import IMovie from 'types/movie';

export const MovieSchema = new mongoose.Schema<IMovie>({
  _dbId: {
    type: Number,
    required: true,
  },
  comic: {
    type: String,
    required: true,
    enum: ['dc', 'marvel', 'x'],
  },
  phase: {
    type: Number,
  },
  videoUrls: {
    type: [String],
    required: true,
  },
  keywords: {
    type: [String],
    required: true,
  },
  _movieId: {
    type: Number,
    required: true,
  },
  imdbId: {
    type: String,
    required: true,
  },

  countries: {
    type: [
      {
        country: {
          type: String,
        },
      },
    ],
    required: true,
  },

  genres: {
    type: [
      {
        genre: String,
      },
    ],
    required: true,
  },

  directors: {
    type: [
      {
        id: String,
        name: String,
        description: String,
        // required: true
      },
    ],
    required: true,
  },

  actors: {
    type: [
      {
        id: String,
        image: String,
        name: String,
        asCharacter: String,
      },
    ],
    required: true,
  },

  nameRu: {
    type: String,
    required: true,
  },
  nameOriginal: {
    type: String,
    required: true,
  },

  ratingGoodReview: {
    type: Number,
  },
  ratingKinopoisk: {
    type: Number,
    required: true,
  },
  ratingImdb: {
    type: Number,
    required: true,
  },
  ratingFilmCritics: {
    type: Number,
    required: true,
  },
  ratingAwait: {
    type: Number,
  },

  ratingMpaa: {
    type: String,
    required: true,
  },

  ratingAgeLimits: {
    type: String,
  },

  slogan: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
  },

  webUrl: {
    type: String,
    required: true,
  },

  year: {
    type: Number,
    required: true,
  },
  filmLength: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  serial: {
    type: Boolean,
    required: true,
  },
  shortFilm: {
    type: Boolean,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  hasImax: {
    type: Boolean,
  },
  has3D: {
    type: Boolean,
  },
  reviewsCount: {
    type: Number,
  },

  posterUrl: {
    type: String,
    required: true,
  },
  posterUrlPreview: {
    type: String,
    required: true,
  },
  coverUrl: {
    type: String,
  },
  logoUrl: {
    type: String,
  },
});

export default MovieSchema;
