const path = require('path');
const express = require('express');
const fs = require('fs');

const BUILD_DIR = path.join(__dirname, '../build');
const PORT = process.env.Port || 3000;
const app = express();

/////////////////////////////////////////////////////////

////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
class User {
  static createUser({ email, username, password }) {
    return Object.assign({ email, username, password }, {
      token: uuidv4(),
      name: null,
      avatar: null,
      isAdmin: false,
      favorites: [],
      ratings: [],
      watchlist: [],
      biography: null,
      gender: null,
      birthday: null,
      country: null
    });
  }

  static getUserReduxState(user) {
    return {
      username: user.username,
      name: user.name,
      token: user.token,
      favorites: user.favorites,
      ratings: user.ratings,
      watchlist: user.watchlist,
      avatar: user.avatar,
      biography: user.biography,
      birthday: user.birthday,
      country: user.country,
      gender: user.gender
    };
  }

  static editUser(settings, user) {
    const changedUser = user;
    for (const key of Object.keys(changedUser)) {
      if (key !== 'token' && settings[key]) {
        user[key] = settings[key];
      }
    }
    return changedUser;
  }
}

////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
class Data {
  static pathData = path.resolve(
    __dirname,
    '../data'
  );
  static listOfDataFiles = fs
    .readdirSync(this.pathData)
    .map((name) => name.replace('.json', ''));

  static writeData(array, filename) {
    const isExists = this.listOfDataFiles.includes(filename);
    if (!isExists) throw Error('file not found');
    fs.writeFileSync(
      this.pathData + `/${filename}.json`,
      JSON.stringify(array)
    );
  }

  static parseData(filename) {
    const isExists = this.listOfDataFiles.includes(filename);
    if (!isExists) throw Error('file not found');
    return JSON.parse(
      fs.readFileSync(this.pathData + `/${filename}.json`, 'utf-8')
    );
  }

  static parseAllMoviesData() {
    const files = this.listOfDataFiles.filter(
      (file) => file === 'dc' || file === 'marvel'
    );
    const data = [];
    for (let i = 0; i < files.length; i++) {
      const parsedData = this.parseData(files[i]);
      data.push(...parsedData);
    }
    return data;
  }

  static getMovieById(paramsWithId, allMovies) {
    const id = +paramsWithId.replace(/\D/gi, '');
    const isAlternative = paramsWithId.includes('+withAlts');
    const movieById = allMovies.find(
      (movie) => movie.kinopoiskId === id
    );
    if (isAlternative) {
      const matchedAlternativeMovies = this.getSimilarMoviesById(id, allMovies);
      return { movie: movieById, alternatives: matchedAlternativeMovies };
    } else return movieById;
  }

  static getMovieListByFranchise(keywords, allMovies) {
    return keywords.split('&keywords=').map((keywords, index) => {
      const ArrKeywords = keywords.split(',');
      const title = ArrKeywords[0];
      const id = index;
      const movies = allMovies
        .filter((movie) => {
          for (let i = 0; i < ArrKeywords.length; i++) {
            const keyword = ArrKeywords[i];
            if (movie.nameOriginal.includes(keyword)) return movie;
          }
        })
        .sort((a, b) => b.year - a.year);
      return { id, title, movies };
    });
  }

  static getSimilarMoviesById(id, allMovies) {
    const mainMovie = allMovies.filter((movie) => movie.kinopoiskId === id)[0];
    const matchedMovies = allMovies.filter(
      (movie) =>
        movie.comic === mainMovie.comic &&
        mainMovie.nameOriginal !== movie.nameOriginal
    );
    return matchedMovies.sort((a, b) => b.year - a.year).slice(0, 11);
  }
}

////////////////////////////////////////////////////////
///////////////////////////////////////////////////////

const getMovieById = (req, res) => {
  const movies = Data.parseAllMoviesData();
  res.send(Data.getMovieById(req.params.id, movies));

};
const getMoviesByIds = (req, res) => {
  const list = req.params.ids.split(',');
  const movies = Data.parseAllMoviesData();
  res.send(
    list.map((id) => {
      return movies.find((movie) => movie.kinopoiskId === +id);
    })
  );
};
const getFranchises = (req, res) => {
  const movies = Data.parseAllMoviesData();
  console.log('Request params: ', req.params.keywords);
  res.send(Data.getMovieListByFranchise(req.params.keywords, movies));
};
const getMovieByName = (req, res) => {

  const searchTerm = req.params.searchTerm.toLowerCase().replace(/\s/g, '');
  console.log('Request params: ', searchTerm);
  const movies = Data.parseAllMoviesData();

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
};
const registration = (req, res) => {
  const { email, username, password } = req.body;
  console.log('Request body: ', req.body);
  const users = Data.parseData < UserServerState > ('users');
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
    user: User.getUserReduxState(newUser)
  });

  Data.writeData([...users, newUser], 'users');
};
const login = (req,res) => {
  const { login, password } = req.body;
  console.log('Request body:', { login, password });
  const users = Data.parseData('users');

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
}
const getUserState = (req,res) => {
  const reqToken = req.params.token;
  console.log('Request params: ', reqToken);
  const users = Data.parseData('users');
  const matchedUser = users.find(
    (user) => user.token === reqToken
  );
  res.send(User.getUserReduxState(matchedUser));
}
const getProfile = (req,res) => {
  const reqUsername = req.params.username;
  console.log('Request params: ', reqUsername);
  const users = Data.parseData('users');
  const matchedUser = users.find((user) => user.username === reqUsername);
  if (matchedUser) {
    res.status(200).json({ user: User.getUserReduxState(matchedUser) });
  }
  if (!matchedUser) {
    res.status(404);
  }
}
const editProfile = (req,res) => {
  console.log('Request body: ', req.body);
  try {
    Data.writeData(
      Data.parseData('users').map((user) => {
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
}
const getCountries = (req,res) => {
  res.send(Data.parseData('countries'));
}
////////////////////////////////////////////////////////

//Serving the files on the dist folder
app.use(express.static(BUILD_DIR));

//Send index.html when the user access the web
app.get('*', function(req, res) {
  res.sendFile(path.join(BUILD_DIR, 'index.html'));
});

app.get('/getMovieById/:id', getMovieById);
app.get('/getMoviesByIds/:ids', getMoviesByIds);
app.get('/franchises/:keywords', getFranchises);
app.get('/getMoviesByName/:searchTerm', getMovieByName);
app.post('/registration', registration);
app.post('/login', login);
app.get('/getUserState/:token', getUserState);
app.get('/getProfile/:username', getProfile);
app.post('/editProfile', editProfile);
app.get('/countries', getCountries);

app.listen(PORT);
