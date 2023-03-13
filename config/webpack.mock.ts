import webpackMockServer from 'webpack-mock-server';
import cors from 'cors';
import Data from './tools/mockHelper';
import { UserReduxState, UserServerState } from 'models/User';
import { v4 as uuidv4 } from 'uuid';

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
  const users = Data.parseData<UserServerState>('users');
  console.log(users);
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
  app.get('/id=:id', (req, res) => {
    res.send(Data.getMovieById(req.params.id, movies));
  });
  app.get('/movies-all', (req, res) => {
    res.send(movies);
  });
  app.get('/franchises=:keywords', (req, res) => {
    res.send(Data.getMovieListByFranchise(req.params.keywords, movies));
  });
  app.get('/name=:searchTerm', (req, res) => {
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
  app.post('/registration', (req, res) => {
    const { email, username, password } = req.body;
    console.log(req.body);
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        res.status(201).json({ message: 'this email is already taken' });
        return;
      }
      if (users[i].username === username) {
        res.status(201).json({ message: 'this login is already taken' });
        return;
      }
    }

    const token = uuidv4();

    const newUser = {
      token,
      email,
      username,
      password,
      isAdmin: false,
      favorites: [],
      avatar: '',
    };
    res.status(200).json({
      message: 'User was create',
      user: { token, favorites: [], avatar: '' } as UserReduxState,
    });
    Data.writeData<UserServerState>([...users, newUser], 'users');
  });
  app.post('/login', (req, res) => {
    const { login, password } = req.body;

    for (let i = 0; i < users.length; i++) {
      const user_email = users[i].email;
      const user_username = users[i].username;
      const user_password = users[i].password;

      if (login === user_username || login == user_email) {
        if (password === user_password) {
          return res.status(200).json({
            message: 'authorization was successful',
            user: {
              token: users[i].token,
              favorites: users[i].favorites,
              avatar: users[i].avatar,
            },
          });
        }
        return res.status(401).json({ message: 'Invalid password' });
      }
    }

    return res.status(401).json({
      message: 'We cannot find an account with that email address or username',
    });
  });
  app.get('/getUserState/:token', (req, res) => {
    const reqToken = req.params.token;
    console.log(reqToken);
    const { token, avatar, favorites } = users.find(
      (user) => user.token === reqToken
    ) as UserServerState;
    res.send({ token, avatar, favorites } as UserReduxState);
  });
});
