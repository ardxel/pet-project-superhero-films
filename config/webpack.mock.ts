import webpackMockServer from 'webpack-mock-server';
import fs from 'fs';
import nodePath from 'path';
import cors from 'cors';

export default webpackMockServer.add((app, helper) => {
  app.use(cors());
  app.get('/testGet', (req, res) => {
    res.json('JS get-object can be here. Random int:' + helper.getRandomInt());
  });
  app.post('/testPost', (req, res) => {
    res.json('JS post-object can be here');
  });

  // let movies = JSON.parse(
  //   fs.readFileSync(nodePath.join(__dirname, '../data/movies.json'), 'utf-8')
  // );
  // let users = JSON.parse(
  //   fs.readFileSync(nodePath.join(__dirname, '../data/users.json'), 'utf-8')
  // );
  // console.log(users);
  console.log(
    JSON.parse(fs.readFileSync(nodePath.join(__dirname, '../data/movies.json'),'utf-8'))
      .map(item => {
        return item.nameRu
      })
  )

  app.post('/save-movie', (req, res) => {
    let movie = req.body;
    console.log(movie);

    const data = fs.readFileSync(
      nodePath.join(__dirname, '../data/movies.json'),
      'utf-8'
    );
    const movies = JSON.parse(data);

    const isRepeatMovie = movies.find(
      (item) => item.kinopoiskId === movie.kinopoiskId
    );

    if (isRepeatMovie) {
      res.sendStatus(401);
      console.log('this film has already been added');
      return;
    }
    movie = {id: movies.length+1, ...movie};

    movies.push(movie);

    const jsonData = JSON.stringify(movies);
    fs.writeFileSync(nodePath.join(__dirname, '../data/movies.json'), jsonData);

    res.sendStatus(200);
  });
});
