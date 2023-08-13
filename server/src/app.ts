import cors from 'cors';
import MongooseService from 'db/mongoose.service';
import express, { Application } from 'express';
import morgan from 'morgan';
import config from './config';

import { errorHandler, notFound } from 'middleware';
import model from 'models';
import { IUser } from 'models/user/user.types';
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
      this.app.get('/api/v1/deleteAllUsers', async (req, res) => {
        await model.user.deleteMany({});
        res.status(204).send('<h1>All users deleted</h1>');
      });
      this.app.get('/api/v1/getAllUsers', async (req, res) => {
        const users = await model.user.find({});
        res.status(200).json({ users });
      });
      this.app.post('/api/v1/validate', async (req, res) => {
        const fields = req.body.fields as Partial<IUser>;
        const user = await model.user.findOne({ username: 'ardxel1' });
        for (const field in fields) {
          const previousValue = user![field];
          user![field] = fields[field];
          const isValid = await user!.$isValid(field);
          if (!isValid) {
            user![field] = previousValue;
            console.log('afterError: ', user);
          }
        }
        res.json({});
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
