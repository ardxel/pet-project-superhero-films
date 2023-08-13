import MovieModel from './movie';
import UserModel from './user';

const model = {
  movie: MovieModel,
  user: UserModel,
} as const;

export default model;
