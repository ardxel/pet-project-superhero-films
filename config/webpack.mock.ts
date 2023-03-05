import webpackMockServer from 'webpack-mock-server';
import cors from 'cors';
import Data from './tools/mockHelper';

export default webpackMockServer.add((app, helper) => {
  app.use(cors());
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    next();
  });
  app.get('/testGet', (req, res) => {
    res.json('JS get-object can be here. Random int:' + helper.getRandomInt());
  });
  app.post('/testPost', (req, res) => {
    res.json('JS post-object can be here');
  });

  const movies = Data.parseAllMoviesData();
  movies.forEach((movie) => {
    console.log(movie.nameRu, movie.kinopoiskId);
  });
  // localhost:3000/root
  app.post('/save-movie', (req, res) => {
    let movie = req.body;
    console.log(movie);
    const filename = movie.comic === 'dc' ? 'dc' : 'marvel';

    const isRepeatMovie = movies.find(
      (item) => item.kinopoiskId === movie.kinopoiskId
    );

    if (isRepeatMovie) {
      res.sendStatus(401);
      console.log('this film has already been added');
      return;
    }
    movie = { id: movies.length + 1, ...movie };
    movies.push(movie);
    Data.writeData(movies, filename);
    res.sendStatus(200);
  });
  app.get('/&id=:id', (req, res) => {
    res.send(Data.getMovieById(req.params.id, movies));
  });
  app.get('/movies-all', (req, res) => {
    res.send(movies);
  });
  app.get('/franchises=:keywords', (req, res) => {
    res.send(Data.getMovieListByFranchise(req.params.keywords, movies));
  });
  app.get('/&name=:searchTerm', (req, res) => {
    const searchTerm = req.params.searchTerm.toLowerCase().replace(/\s/g, '');

    const matchedMovies = movies
      .filter((movie) => {
        const name1 = movie.nameOriginal
          .toLowerCase()
          .trim()
          .replace(/[^a-z]/gi, '');
        const name2 = movie.nameRu
          .toLowerCase()
          .trim()
          .replace(/[^a-яA-Z]/gi, '');

        if (
          name1.includes(searchTerm) ||
          name2.includes(searchTerm) ||
          name2.replace(/[ёэ]/gi, 'е').includes(searchTerm)
        ) {
          return movie;
        }
      })
      .sort((a, b) => b.year - a.year)
      .slice(0, 10);

    res.send(matchedMovies);
  });
});
