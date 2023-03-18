import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import BASE_URL from '@constants/baseUrl';
import IMovie from 'models/Movie';
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
  reducerPath: 'movies',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMovie: builder.query<
      IMovie | MovieWithAlternativeList,
      getMovieWithAlternativesQueryArgs
    >({
      query: ({ id, alternative }: { id: string; alternative: boolean }) =>
        `/id=${id}${alternative ? '+withAlts' : ''}`,
    }),
    getAllMovies: builder.query<IMovie[], void>({
      query: () => '/movies-all',
    }),
    searchMovie: builder.query<IMovie[], string>({
      query: (searchTerm) => `/name=${searchTerm}`,
    }),
    getMoviesByFranchiseList: builder.query<
      FranchiseListResponse[],
      FranchiseList[]
    >({
      query: (franchiseList) =>
        `/franchises=${franchiseList
          .map((list) => list.keywords!.toString())
          .join('&keywords=')}`,
    }),
  }),
});
export const {
  useGetMoviesByFranchiseListQuery,
  useGetMovieQuery,
  useSearchMovieQuery,
} = moviesApi;
