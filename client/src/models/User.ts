export type UserToken = string | null;

export type UserCollection = {
  favorites: number[];
  ratings: { id: number; value: number }[];
  watchlist: number[];
};

export type UserPersonalInfo = {
  gender: string | null;
  birthday: string | null;
  country: string | null;
};

export interface UserReduxState extends UserCollection, UserPersonalInfo {
  username: string | null;
  name: string | null;
  token: UserToken | null;
  avatar: string | null;
  biography: string | null;
}

export interface UserServerState extends UserReduxState {
  token: UserToken;
  avatar: string | null;
  email: string;
  username: string;
  name: string | null;
  password: string;
  isAdmin: boolean;
}
