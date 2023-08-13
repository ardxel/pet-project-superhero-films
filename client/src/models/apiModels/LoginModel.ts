import { UserReduxState } from '@models/User';
import { FormikValues } from '@models/formModels';
import { DefaultResponse } from './DefaultUserResponse';

export interface LoginRequest extends FormikValues {
  emailOrUsername: string;
  password: string;
}

export type LoginResponse = DefaultResponse<{ user: UserReduxState }>;
