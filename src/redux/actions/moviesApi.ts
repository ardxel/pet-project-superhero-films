import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import BASE_URL from '@constants/baseUrl';
import IMovie from 'types/Movie';

export const moviesApi = createApi({
  reducerPath: 'movies',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMovie: builder.query<IMovie, string>({
      query: (id) => `/&id=${id}`
    }),
    getAllMovies: builder.query<IMovie[], void>({
      query: () => '/movies-all',
    }),
    searchMovie: builder.query<IMovie[], string>({
      query: (searchTerm) => `/&name=${searchTerm}`,
    }),
    getFranchise: builder.query<IMovie[], string>({
      query: (name) => `&franchise=${name}`,
    }),
  }),
});

export const { useGetFranchiseQuery, useGetMovieQuery, useSearchMovieQuery } =
  moviesApi;
