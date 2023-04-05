import { UserReduxState, UserServerState } from "@models/User";
import { v4 as uuidv4 } from "uuid";

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
      biography: null,
      gender: null,
      birthday: null,
      country: null,
    });
  }

  static getUserReduxState(user: UserServerState): UserReduxState {
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
      gender: user.gender,
    };
  }

  static editUser<T = UserServerState, K = keyof T & {}>(
    settings: K & {},
    user: T & {}
  ): T {
    const changedUser = user;
    for (const key of Object.keys(changedUser)) {
      if (key !== "token" && settings[key]) {
        user[key] = settings[key];
      }
    }
    return changedUser;
  }
}
