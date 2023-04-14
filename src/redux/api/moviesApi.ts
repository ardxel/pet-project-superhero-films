import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import BASE_URL from '@constants/baseUrl';
import IMovie from '@models/Movie';
import {
  FranchiseList,
  FranchiseListResponse,
} from '@constants/franchisesList';

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
      query: ({ id, alternative }: { id: string; alternative: boolean }) =>
        `/getMovieById/${id}${alternative ? '+withAlts' : ''}`,
    }),
    getMoviesByIds: builder.query<IMovie[], number[]>({
      query: (ids: number[]) => `/getMoviesByIds/${ids.toString()}`,
    }),
    searchMovie: builder.query<IMovie[], string>({
      query: (searchTerm) => `/getMoviesByName/${searchTerm}`,
    }),
    getMoviesByFranchiseList: builder.query<
      FranchiseListResponse[],
      FranchiseList[]
    >({
      query: (franchiseList) =>
        `/franchises/${franchiseList
          .map((list) => list.keywords!.toString())
          .join('&keywords=')}`,
    }),
  }),
});

export const moviesApiName = moviesApi.reducerPath;

export const moviesApiReducer = moviesApi.reducer;

export const moviesApiMiddleware = moviesApi.middleware;

export const {
  useGetMoviesByFranchiseListQuery,
  useGetMovieQuery,
  useGetMoviesByIdsQuery,
  useSearchMovieQuery,
  useLazyGetMoviesByIdsQuery,
} = moviesApi;
