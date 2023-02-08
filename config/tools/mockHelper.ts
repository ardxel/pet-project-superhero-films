import path from 'path';
import fs from 'fs';

export default class Data {

  // absolute path of the data directory
  static readonly _pathData = path.resolve(__dirname, '../../data');

  // returns an array of data from folder with all data files.
  //for example, if the filename is "marvel" then this function will return marvel.json
  // and then parse json format into literal array from data folder
  static parseData<T>(filename: string): T[] {
    return JSON.parse(
      fs.readFileSync(path.join(this._pathData, `${filename}.json`), 'utf-8')
    );
  }

  // overwrites the data file in the data folder.
  // array is overwritten on top of all data in the file
  // filename is the same thing as in the method above
  static writeData<T>(array: T[], filename: string): void {
    fs.writeFileSync(
      path.join(this._pathData, `${filename}.json`),
      JSON.stringify(array)
    );
  }
}

