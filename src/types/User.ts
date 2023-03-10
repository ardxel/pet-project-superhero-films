import Movie from 'types/Movie';

export type UserToken = string;

export interface UserReduxState {
  token: UserToken | null,
  avatar: string | null,
  favorites: Movie[]
}

export interface UserServerState extends UserReduxState{
  token: UserToken,
  avatar: string,
  email: string;
  username: string;
  password: string;
  isAdmin: boolean;
}


