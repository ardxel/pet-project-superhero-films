import IMovie from '@models/Movie';
import instance, { BaseResponse } from './config';

interface ResponseDataMovieById {
  movie?: IMovie;
  franchiseMovies?: IMovie[];
  comicMovies?: IMovie[];
}
export type ResponseMovieById = BaseResponse<ResponseDataMovieById>;

/**
 * get single movie with optional alternatives
 */
export const fetchMovieById = async (
  id: number,
  withComic?: boolean,
  withFranchise?: boolean,
): Promise<ResponseDataMovieById | undefined> => {
  try {
    const params = new URLSearchParams([
      ['withComic', String(withComic)],
      ['withFranchise', String(withFranchise)],
    ]);
    const response = await instance.get<ResponseMovieById>(`/movies/${id}`, {
      params,
    });
    if (response.data.success) {
      return response.data.data as ResponseDataMovieById;
    } else {
      throw new Error(response.data.error || response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

interface ResponseDataMoviesByIds {
  movies: IMovie[];
}
export type ResponseMoviesByIds = BaseResponse<ResponseDataMoviesByIds>;
/**
 * get movie list by id list
 */
export const fetchMoviesByIds = async (
  ids?: number[],
  fields?: string[],
): Promise<ResponseDataMoviesByIds | undefined> => {
  try {
    const response = await instance.get<ResponseMoviesByIds>(`/movies/`, {
      params: {
        ids: ids?.join(','),
        fields: fields?.join(','),
      },
    });
    if (response.data.success) {
      return response.data.data as ResponseDataMoviesByIds;
    } else {
      throw new Error(response.data.error || response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

interface ResponseDataMoviesBySearch extends ResponseDataMoviesByIds {}
export type ResponseMoviesBySearch = BaseResponse<ResponseDataMoviesBySearch>;

/**
 * get movie list by search term
 */
export const fetchMoviesBySearch = async (queryParams: {
  search: string;
  fields?: string[];
}): Promise<ResponseDataMoviesBySearch | undefined> => {
  try {
    if (queryParams.search.length < 1) {
      return;
    }
    const response = await instance.get<ResponseMoviesBySearch>(`/movies/`, {
      params: {
        search: queryParams.search,
        fields: queryParams.fields?.join(','),
      },
    });
    if (response.data.success) {
      return response.data.data as ResponseDataMoviesBySearch;
    } else {
      throw new Error(response.data.error || response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
type T = ReturnType<typeof fetchMoviesBySearch>;
