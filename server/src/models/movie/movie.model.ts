import { model } from 'mongoose';
import MovieSchema from './movie.schema';

const MovieModel = model('Movie', MovieSchema);

export default MovieModel;
