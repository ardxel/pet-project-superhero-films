import { UserReduxState, UserServerState } from '../../src/models/User';
import { v4 as uuidv4 } from 'uuid';

export default class User {
  static createUser(request: {
    email: string;
    username: string;
    password: string;
  }): UserServerState {
    return Object.assign(request, {
      token: uuidv4(),
      name: null,
      avatar: null,
      isAdmin: false,
      favorites: [],
      ratings: [],
      watchlist: [],
    });
  }
  static getUserReduxState(user: UserServerState): UserReduxState {
    const { username, name, token, avatar, favorites, ratings, watchlist } =
      user;
    return { username, name, token, favorites, ratings, watchlist, avatar };
  }
}
