// async function readAllMovies(): Promise<IMovie[]> {
//   return JSON.parse(await readFile('./data/movies.json', 'utf8'));
// }

// async function setup() {
//   try {
//     await mongoose.connect(config.mongodb.MONGO_URI);
//     const movies = await readAllMovies();
//     await Movie.deleteMany({});
//     await Movie.insertMany(movies);
//     console.log('success');
//     process.exit(0);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// }

// setup();
