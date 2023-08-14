import BASE_URL from '@constants/baseUrl';
import IMovie from '@models/Movie';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface BaseResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}

export interface MovieWithAlternativeList {
  movie: IMovie;
  alternatives: IMovie[];
}

interface getMovieWithAlternativesQueryArgs {
  id: string;
  alternative?: boolean;
}

export const moviesApi = createApi({
  reducerPath: 'api/movies',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMovie: builder.query<
      IMovie | IMovie[] | MovieWithAlternativeList,
      getMovieWithAlternativesQueryArgs
    >({
      query: ({ id, withComic }: { id: string; withComic: boolean }) =>
        `/movies/${id}?withComic=${withComic}`,
      transformResponse(result: BaseResponse<{ movies: IMovie[] }>) {
        return result.data.movies;
      },
    }),
    getMoviesByIds: builder.query<IMovie[], number[]>({
      query: (ids: number[]) => `/movies/?ids=${ids.join(',')}`,
      transformResponse(result: BaseResponse<{ movies: IMovie[] }>) {
        return result.data.movies;
      },
    }),
    searchMovie: builder.query<IMovie[], string>({
      query: (searchTerm) => `/movies/?search=${searchTerm}`,
      transformResponse(result: BaseResponse<{ movies: IMovie[] }>) {
        return result.data.movies;
      },
    }),
  }),
});

export const moviesApiName = moviesApi.reducerPath;

export const moviesApiReducer = moviesApi.reducer;

export const moviesApiMiddleware = moviesApi.middleware;

export const {
  useGetMovieQuery,
  useGetMoviesByIdsQuery,
  useSearchMovieQuery,
  useLazyGetMoviesByIdsQuery,
} = moviesApi;
