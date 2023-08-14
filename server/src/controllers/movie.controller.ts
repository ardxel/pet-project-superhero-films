import { Request } from 'express';
import { IResponse, StringifyQueryObject } from 'types/api';

import { StatusCodes } from 'http-status-codes';
import model from 'models';
import { QueryOptions } from 'mongoose';
import IMovie from 'types/movie';

interface ResDataGetMany {
  movies: IMovie[];
}
interface ResDataGetSingle {
  movie: IMovie;
  franchiseMovies?: IMovie[];
  comicMovies?: IMovie[];
}

export class MovieController {
  static getMany = async (
    req: Request<never, never, never, StringifyQueryObject<'ids' | 'search' | 'fields'>>,
    res: IResponse<ResDataGetMany>,
  ) => {
    const queryObject = res.locals.queryObject as QueryOptions;
    const fields = req.query.fields;
    const matchedMovies = await model.movie.find(queryObject, fields ? fields.split(',') : {});

    res.status(StatusCodes.OK).json({
      success: true,
      data: {
        movies: matchedMovies,
      },
    });
  };
  static getOne = async (
    req: Request<StringifyQueryObject<'id'>, never, never, StringifyQueryObject<'withFranchise' | 'withComic'>>,
    res: IResponse<ResDataGetSingle>,
  ) => {
    const { id } = req.params;
    const { withFranchise, withComic } = req.query;
    const resData = {} as ResDataGetSingle;

    if (id) {
      const matchedMovie = await model.movie.findOne({ _movieId: id });
      if (matchedMovie) {
        resData['movie'] = matchedMovie;
      }
    }

    if (withFranchise === 'true') {
      resData['franchiseMovies'] = await model.movie
        .find({
          keywords: {
            $in: resData.movie.keywords,
          },
        })
        .sort('-year');
    }

    if (withComic === 'true') {
      const { comic } = resData.movie;
      resData['comicMovies'] = await model.movie.find({ comic }).sort('-year').limit(10);
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: resData,
    });
  };
  static getAll = async (
    req: Request<never, never, never, StringifyQueryObject<'limit'>>,
    res: IResponse<IMovie[]>,
  ) => {
    const { limit } = req.query;
    const allMovies = await model.movie.find({}).limit(limit ? Number(limit) : 40);

    res.status(StatusCodes.OK).json({
      success: true,
      data: allMovies,
    });
  };
}
