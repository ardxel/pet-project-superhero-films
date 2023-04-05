import webpackMockServer from 'webpack-mock-server';
import cors from 'cors';
import Data from './tools/DataHelper';
import { UserServerState } from '@models/User';
import User from './tools/UsersHelper';
import countries from 'country-js/countries.json';

export const mockServer = webpackMockServer.add((app, helper) => {
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
  app.get('/getMovieById/:id', (req, res) => {
    res.send(Data.getMovieById(req.params.id, movies));
  });
  app.get('/getMoviesByIds/:ids', (req, res) => {
    const list = req.params.ids.split(',');
    const movies = Data.parseAllMoviesData();
    res.send(
      list.map((id) => {
        return movies.find((movie) => movie.kinopoiskId === +id);
      })
    );
  });
  app.get('/franchises/:keywords', (req, res) => {
    console.log('Request params: ', req.params.keywords);
    res.send(Data.getMovieListByFranchise(req.params.keywords, movies));
  });
  app.get('/getMoviesByName/:searchTerm', (req, res) => {
    const searchTerm = req.params.searchTerm.toLowerCase().replace(/\s/g, '');
    console.log('Request params: ', searchTerm);
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
    console.log('Request body: ', req.body);
    const users = Data.parseData<UserServerState>('users');
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        res.status(201).json({ message: 'This email is already taken' });
        return;
      }
      if (users[i].username === username) {
        res.status(201).json({ message: 'This login is already taken' });
        return;
      }
    }

    const newUser = User.createUser({ email, username, password });

    res.status(200).json({
      message: 'User was create',
      user: User.getUserReduxState(newUser),
    });

    Data.writeData<UserServerState>([...users, newUser], 'users');
  });
  app.post('/login', (req, res) => {
    const { login, password } = req.body;
    console.log('Request body:', { login, password });
    const users = Data.parseData<UserServerState>('users');

    for (let i = 0; i < users.length; i++) {
      const user_email = users[i].email;
      const user_username = users[i].username;
      const user_password = users[i].password;

      if (login === user_username || login == user_email) {
        if (password === user_password) {
          return res.status(200).json({
            message: 'Authorization was successful',
            user: User.getUserReduxState(users[i]),
          });
        }
        return res.status(201).json({ message: 'Password is incorrect' });
      }
    }

    return res.status(201).json({
      message: 'We cannot find an account with that email address or username',
    });
  });
  app.get('/getUserState/:token', (req, res) => {
    const reqToken = req.params.token;
    console.log('Request params: ', reqToken);
    const users = Data.parseData<UserServerState>('users');
    const matchedUser = users.find(
      (user) => user.token === reqToken
    ) as UserServerState;
    res.send(User.getUserReduxState(matchedUser));
  });
  app.get('/getProfile/:username', (req, res) => {
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
  });
  app.post('/editProfile', (req, res) => {
    console.log('Request body: ', req.body);
    try {
      Data.writeData(
        Data.parseData<UserServerState>('users').map((user) => {
          if (user.token === req.body.token) {
            return User.editUser(req.body, user);
          }
          return user;
        }),
        'users'
      );
      res
        .status(200)
        .json({ message: 'Profile settings have been successfully changed' });
    } catch (e) {
      console.log(e);
      res.status(404);
    }
  });
  app.get('/countries', (_, res) => {
    res.send(Data.parseData<unknown>('countries'));
  });
});
