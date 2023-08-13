import { HydratedDocument, Model } from 'mongoose';
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

export type IUserSafe = Omit<IUser, 'password' | 'role'>;
export interface UserMethods {
  createToken: () => string;
  checkPassword: (password: string) => Promise<boolean>;
  getSafeCopy: () => IUserSafe;
  change: <T extends keyof IUser>(field: T, value: IUser[T]) => void;
}

interface IUserStatics {
  findByUsername: (username: string) => Promise<DocumentUser | null>;
}

export type DocumentUser = HydratedDocument<IUser, UserMethods>;

export interface UserModel extends Model<IUser, unknown, UserMethods> {}
