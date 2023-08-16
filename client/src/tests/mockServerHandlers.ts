import Data from '../../config/tools/DataHelper';
import User from '../../config/tools/UserHelper';

import { UserServerState } from '@models/User';

const movies = Data.parseAllMoviesData();

export const getMovieById = (req, res) => {
  res.sendStatus(200).send(Data.getMovieById(req.params.id, movies));
};

export const getMoviesByIds = (req, res) => {
  const list = req.params.ids.split(',');
  res.send(
    list.map((id) => {
      return movies.find((movie) => movie.kinopoiskId === +id);
    }),
  );
};

export const getProfile = (req, res) => {
  const reqUsername = req.params.username;
  console.log('Request params: ', reqUsername);
  const users = Data.parseData<UserServerState>('users');
  const matchedUser = users.find((user) => user.username === reqUsername);
  if (matchedUser) {
    res.status(200).json({ user: User.getUserReduxState(matchedUser) });
  }
  if (!matchedUser) {
    res.status(404);
  }
};
