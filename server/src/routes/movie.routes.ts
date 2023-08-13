import RoutesConfig from 'common/Routes.config';
import { MovieController } from 'controllers';
import { Application, Router } from 'express';
import MoviesMiddleware from 'middleware/movies.middleware';

export class MovieRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, 'MovieRoutes');
  }

  configureRoutes(): Application {
    const router = Router();

    // get all movies
    router.get('/static', this.asyncHandler(MovieController.getAll));

    // get one movie with other movies if queries is exists
    router.get('/:id', this.asyncHandler(MovieController.getOne));

    // get movie list
    router.get('/', [MoviesMiddleware.getQueryObjectFromReqQuery], this.asyncHandler(MovieController.getMany));

    this.app.use('/api/v1/movies', router);

    return this.app;
  }
}
