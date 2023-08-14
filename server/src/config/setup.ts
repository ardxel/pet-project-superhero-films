// import config from 'config';
// import { readFile } from 'fs/promises';
// import model from 'models';
// import mongoose from 'mongoose';
// import IMovie from 'types/movie';
// async function readAllMovies(): Promise<IMovie[]> {
//   return JSON.parse(await readFile('./data/movies.json', 'utf8'));
// }

// async function setup() {
//   try {
//     await mongoose.connect(config.mongodb.uri);
//     const movies = await readAllMovies();
//     await model.movie.deleteMany({});
//     await model.movie.insertMany(movies);
//     console.log('success');
//     process.exit(0);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// }

// setup();
