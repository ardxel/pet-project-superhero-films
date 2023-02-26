import webpackMockServer from 'webpack-mock-server';
import cors from 'cors';
import Data from './tools/mockHelper';
import IMovie from 'types/Movie';

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
  app.use('/&id=:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const matchedMovie = movies.find((movie) => movie.kinopoiskId === +id);
    if (matchedMovie) {
      console.log(matchedMovie);
      res.send(matchedMovie);
    } else {
      res.sendStatus(404);
    }
  });
  app.get('/movies-all', (req, res) => {
    res.send(movies);
  });
  app.get('/&franchise=:name', (req, res) => {
    console.log(movies[movies.length - 1]);
    const name = req.params.name;
    const franchiseMovies = movies
      .filter((movie) => movie.nameOriginal.includes(name))
      .sort((a, b) => b.year - a.year);
    res.send(franchiseMovies);
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
