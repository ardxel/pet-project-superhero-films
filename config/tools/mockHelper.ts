import path from 'path';
import fs from 'fs';
import IMovie from 'types/Movie';
import { FranchiseListResponse } from '@constants/franchisesList';

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
    const files = this.listOfDataFiles.filter((file) => file !== 'users');
    const data: T[] = [];
    for (let i = 0; i < files.length; i++) {
      const parsedData = this.parseData<T>(files[i]);
      data.push(...parsedData);
    }
    return data;
  }

  static getMovieListByFranchise(
    keywords: string,
    movies: IMovie[]
  ): FranchiseListResponse[] {
    return keywords.split('&keywords=').map((keywords, index) => {
      const ArrKeywords = keywords.split(',');
      const title = ArrKeywords[0];
      const id = index;
      const list = movies.filter((movie) => {
        for (let i = 0; i < ArrKeywords.length; i++) {
          const keyword = ArrKeywords[i];
          if (movie.nameOriginal.includes(keyword)) return movie;
        }
      });
      return { id, title, list };
    });
  }
  static getSimilarMoviesById(id: number, movies: IMovie[]): IMovie[] {
    const mainMovie = movies.filter((movie) => movie.kinopoiskId === id)[0];
    return movies.filter((movie) => {
      const { phase, year, nameOriginal } = movie;
      if (nameOriginal.includes(mainMovie.nameOriginal)) {
        return movie;
      }
      if (phase === mainMovie.phase) {
        return movie;
      }
      if (year === mainMovie.year) {
        return movie;
      }
    });
  }
}
