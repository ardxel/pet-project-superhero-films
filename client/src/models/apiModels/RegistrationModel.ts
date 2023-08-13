import { FormikValues } from '@models/formModels';
import { UserReduxState } from '@models/User';
import { DefaultUserResponse } from './DefaultUserResponse';

export interface RegistrationRequest extends FormikValues {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}

export type RegistrationResponse = DefaultUserResponse & {
  user: UserReduxState | null;
};