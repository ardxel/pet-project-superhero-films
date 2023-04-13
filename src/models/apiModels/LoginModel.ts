import { FormikValues } from '@models/formModels';
import { UserReduxState } from '@models/User';
import { DefaultUserResponse } from './DefaultUserResponse';

export interface LoginRequest extends FormikValues {
  login: string;
  password: string;
}

export type LoginResponse = DefaultUserResponse & {
  user: UserReduxState | null;
};