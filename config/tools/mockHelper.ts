import path from 'path';
import fs from 'fs';
import IMovie from 'types/Movie';

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
}
