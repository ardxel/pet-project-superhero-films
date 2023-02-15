import webpackMockServer from 'webpack-mock-server';
import cors from 'cors';
import Data from './tools/mockHelper';
import IMovie from 'types/Movie';

export default webpackMockServer.add((app, helper) => {
  app.use(cors());
  app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    next();
  })
  app.get('/testGet', (req, res) => {
    res.json('JS get-object can be here. Random int:' + helper.getRandomInt());
  });
  app.post('/testPost', (req, res) => {
    res.json('JS post-object can be here');
  });

  console.log(
    'MARVEL: ',
    Data.parseData<IMovie>('marvel').map((item) => item.nameRu)
  );
  console.log(
    'DC: ',
    Data.parseData<IMovie>('dc').map((item) => item.nameRu)
  );

  // localhost:3000/root
  app.post('/save-movie', (req, res) => {
    let movie = req.body;
    console.log(movie);
    const filename = movie.comic === 'dc' ? 'dc' : 'marvel';

    const movies = Data.parseData(filename) as any[];

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

  app.get('/movies-all', (req, res) => {
    console.log(Data.listOfDataFiles)
    const movies = Data.parseAllMoviesData();
    res.send(movies);
  });
  app.get('/franchise=:name', (req, res) => {
    const name = req.params.name;
    const movies = Data
      .parseAllMoviesData()
      .filter(movie => movie.nameOriginal.includes(name))
      .sort((a,b) => b.year - a.year);
    res.send(movies);
  })
})
