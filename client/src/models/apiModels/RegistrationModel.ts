import { UserReduxState } from '@models/User';
import { FormikValues } from '@models/formModels';
import { DefaultResponse } from './DefaultUserResponse';

export type RegistrationRequest = Pick<
  FormikValues,
  'username' | 'email' | 'password'
>;

export type RegistrationResponse = DefaultResponse<{ user: UserReduxState }>;
