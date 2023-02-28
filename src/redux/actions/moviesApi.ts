import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import BASE_URL from '@constants/baseUrl';
import IMovie from 'types/Movie';
import {
  FranchiseList,
  FranchiseListResponse,
} from '@constants/franchisesList';

export const moviesApi = createApi({
  reducerPath: 'movies',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMovie: builder.query<IMovie, string>({
      query: (id) => `/&id=${id}`,
    }),
    getAllMovies: builder.query<IMovie[], void>({
      query: () => '/movies-all',
    }),
    searchMovie: builder.query<IMovie[], string>({
      query: (searchTerm) => `/&name=${searchTerm}`,
    }),
    getMoviesByFranchiseList: builder.query<
      FranchiseListResponse[],
      FranchiseList[]
    >({
      query: (franchiseList) =>
        `franchises=${franchiseList
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
