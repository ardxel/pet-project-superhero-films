import webpackMockServer from 'webpack-mock-server';
import cors from 'cors';
import Data from './tools/DataHelper';
import { UserServerState } from 'models/User';
import User from './tools/UsersHelper';

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
    const users = Data.parseData<UserServerState>('users');
    const matchedUser = users.find(
      (user) => user.token === reqToken
    ) as UserServerState;
    res.send(User.getUserReduxState(matchedUser));
  });
  // app.post('/changeUserName', (req, res) => {
  //   const { name, token } = req.body;
  //   console.log('Request Body:', { name, token });
  //   const matchedUserIndex = users.findIndex((user) => user.token === token);
  //   if (matchedUserIndex !== -1) {
  //     const changedUsers = users.map((user, index) => {
  //       if (index === matchedUserIndex) {
  //         return { ...user, name: name };
  //       }
  //       return user;
  //     });
  //     Data.writeData<UserServerState>(changedUsers, 'users');
  //     res.status(200).json({ message: 'Name changed successfully', name: name });
  //     return;
  //   }
  //   res.status(401);
  // });
});
