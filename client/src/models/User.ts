export interface UserCollection {
  favorites: number[];
  ratings: { id: number; value: number }[];
  watchlist: number[];
}

export interface IUser extends UserCollection {
  email: string;
  username: string;
  password: string;
  role: 'ADMIN' | 'USER';

  avatar?: string;
  name?: string;
  biography?: string;
  gender?: string;
  birthday?: string;
  country?: string;
}

export interface UserReduxState extends Omit<IUser, 'password' | 'role'> {}
export interface UserServerState extends IUser {}
