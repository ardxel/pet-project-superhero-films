import { UserReduxState } from '@models/User';
import { FormikValues } from '@models/formModels';
import { DefaultResponse } from './DefaultUserResponse';

export interface LoginRequest extends Pick<FormikValues, 'emailOrUsername' | 'password'> {}

export type LoginResponse = DefaultResponse<{ user: UserReduxState }>;
