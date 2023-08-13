export interface IUser {
  email: string;
  username: string;
  password: string;
  role: 'ADMIN' | 'USER';
  favorites: number[];
  ratings: { id: number; value: number }[];
  watchlist: number[];

  avatar?: string;
  name?: string;
  biography?: string;
  gender?: string;
  birthday?: string;
  country?: string;
}

export interface UserReduxState extends Omit<IUser, 'password' | 'role'> {}
export interface UserServerState extends IUser {}
