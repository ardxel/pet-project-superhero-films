import path from 'path';
import fs from 'fs';
import IMovie from '../../src/models/Movie';
import { FranchiseListResponse } from '@constants/franchisesList';
import { MovieWithAlternativeList } from 'redux/api/moviesApi';

export default class Data {
  // absolute path of the data directory
  private static readonly pathData: string = path.resolve(
    __dirname,
    '../../data'
  );

  static readonly listOfDataFiles: string[] = fs
    .readdirSync(this.pathData)
    .map((name) => name.replace('.json', ''));

  // returns an array of data from folder with all data files.
  //for example, if the filename is "marvel" then this function will return marvel.json
  // and then parse json format into literal array from data folder
  static parseData<T>(filename: string): T[] {
    const isExists = this.listOfDataFiles.includes(filename);
    if (!isExists) throw Error('file not found');
    return JSON.parse(
      fs.readFileSync(this.pathData + `/${filename}.json`, 'utf-8')
    );
  }

  // overwrites the data file in the data folder.
  // array is overwritten on top of all data in the file
  // filename is the same thing as in the parseData method
  static writeData<T>(array: T[], filename: string): void {
    const isExists = this.listOfDataFiles.includes(filename);
    if (!isExists) throw Error('file not found');
    fs.writeFileSync(
      this.pathData + `/${filename}.json`,
      JSON.stringify(array)
    );
  }

  static parseAllMoviesData<T = IMovie>(): T[] {
    const files = this.listOfDataFiles.filter(
      (file) => file === 'dc' || file === 'marvel'
    );
    const data: T[] = [];
    for (let i = 0; i < files.length; i++) {
      const parsedData = this.parseData<T>(files[i]);
      data.push(...parsedData);
    }
    return data;
  }

  static getMovieById(
    paramsWithId: string,
    allMovies: IMovie[]
  ): IMovie | MovieWithAlternativeList {
    const id = +paramsWithId.replace(/\D/gi, '');
    const isAlternative = paramsWithId.includes('+withAlts');
    const movieById = allMovies.find(
      (movie) => movie.kinopoiskId === id
    ) as IMovie;
    if (isAlternative) {
      const matchedAlternativeMovies = this.getSimilarMoviesById(id, allMovies);
      return { movie: movieById, alternatives: matchedAlternativeMovies };
    } else return movieById;
  }

  static getMovieListByFranchise(
    keywords: string,
    allMovies: IMovie[]
  ): FranchiseListResponse[] {
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

  static getSimilarMoviesById(id: number, allMovies: IMovie[]): IMovie[] {
    const mainMovie = allMovies.filter((movie) => movie.kinopoiskId === id)[0];
    const matchedMovies = allMovies.filter(
      (movie) =>
        movie.comic === mainMovie.comic &&
        mainMovie.nameOriginal !== movie.nameOriginal
    );
    return matchedMovies.sort((a, b) => b.year - a.year).slice(0, 11);
  }
}
