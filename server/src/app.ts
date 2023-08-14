import cors from 'cors';
import MongooseService from 'db/mongoose.service';
import express, { Application } from 'express';
import morgan from 'morgan';
import config from './config';

import { errorHandler, notFound } from 'middleware';
import { MovieRoutes, UserRoutes } from 'routes';

class App {
  protected app: Application;
  protected isDevMode: boolean = config.node_env === 'development';
  constructor() {
    this.app = express();

    this.configureSettings();
    // this.__configureDevRoutes();
    this.configureRoutes();
    this.configureMiddleware();

    this.start();
  }

  __configureDevRoutes() {
    if (this.isDevMode) {
      this.app.get('/', (req, res) => {
        res.send('Hello world!');
      });
    }
  }

  configureSettings() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan('dev'));
  }

  configureRoutes() {
    new MovieRoutes(this.app);
    new UserRoutes(this.app);
  }

  configureMiddleware() {
    this.app.use(notFound);
    this.app.use(errorHandler({ stack: this.isDevMode, watchError: true }));
  }

  start() {
    MongooseService.connectWithRetry('online')
      .then(() => {
        this.app.listen(config.port, () => {
          console.log(`Server listen in ${config.port}`);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

new App();
