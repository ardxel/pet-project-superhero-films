import BASE_URL from '@constants/baseUrl';
import {
  FranchiseList,
  FranchiseListResponse,
} from '@constants/franchisesList';
import IMovie from '@models/Movie';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
    }),
    getMoviesByIds: builder.query<IMovie[], number[]>({
      query: (ids: number[]) => `/movies/?ids=${ids.join(',')}`,
    }),
    searchMovie: builder.query<IMovie[], string>({
      query: (searchTerm) => `/movies/?search=${searchTerm}`,
    }),
    getMoviesByFranchiseList: builder.query<
      FranchiseListResponse[],
      FranchiseList[]
    >({
      query: (franchiseList) =>
        `/movies/?ids=${franchiseList.map((val) => val.id).join(',')}`,
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
