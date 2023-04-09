import { getListOfMoviesIdFromUserState } from '@tools/index';

import User from '../../../config/tools/UserHelper';
import Data from '../../../config/tools/DataHelper';
import { UserServerState } from '@models/User';

const MOCK_USER_STATE = User.getUserReduxState(
  Data.parseData<UserServerState>('users')[0]
);

const ALL_MOVIE_IDS = Data.parseAllMoviesData().map(
  (movie) => movie.kinopoiskId
);

describe('getListOfMoviesIdFromUserState', () => {
  const expectedLength = 7;

  test('input data test', () => {
    expect(() => {
      // @ts-expect-error
      getListOfMoviesIdFromUserState([1, 2, 3]);
    }).toThrow(TypeError);

    expect(() => {
      // @ts-expect-error
      getListOfMoviesIdFromUserState(NaN);
    }).toThrow(TypeError);

    expect(() => {
      // @ts-expect-error
      getListOfMoviesIdFromUserState('12345');
    }).toThrow(TypeError);

    expect(() => {
      getListOfMoviesIdFromUserState(MOCK_USER_STATE);
    }).toBeTruthy();
  });

  test('test result', () => {
    expect(getListOfMoviesIdFromUserState(MOCK_USER_STATE).length).toBe(
      expectedLength
    );

    const movieIds = getListOfMoviesIdFromUserState(MOCK_USER_STATE);
    const randomId = Math.floor(Math.random() * movieIds.length);

    expect(ALL_MOVIE_IDS.includes(movieIds[randomId])).toBeTruthy();

    expect(
      movieIds.map((id) => ALL_MOVIE_IDS.indexOf(id)).every((item) => item >= 0)
    ).toBeTruthy();
  });
});
