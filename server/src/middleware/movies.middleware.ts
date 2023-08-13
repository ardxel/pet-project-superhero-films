import { NextFunction, Request, Response } from 'express';
import model from 'models';
import { QueryOptions } from 'mongoose';
import { StringifyQueryObject } from 'types/api';

class MoviesMiddleware {
  async getQueryObjectFromReqQuery(req: Request, res: Response, next: NextFunction) {
    const { ids, search, fields } = req.query as StringifyQueryObject<'ids' | 'search' | 'fields'>;
    const queryObject: QueryOptions<typeof model.movie> = {};

    if (ids) {
      const idList = ids.split(',');
      queryObject['_movieId'] = { $in: idList };
    }

    if (search) {
      const searchTerm = {
        $regex: search.replace(/\s/g, ''),
        $options: 'i',
      };
      queryObject['$or'] = [
        {
          nameRu: searchTerm,
        },
        {
          nameOriginal: searchTerm,
        },
      ];
    }

    res.locals.queryObject = queryObject;
    next();
  }
}

export default new MoviesMiddleware();
