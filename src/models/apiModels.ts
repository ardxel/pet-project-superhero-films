import { AlertColor } from '@mui/material';
import { UserReduxState, UserServerState, UserToken } from 'models/User';
import { FormikValues } from 'models/formModels';

export type DefaultUserResponse = {
  severity?: AlertColor;
  message: string | undefined;
};

export interface RegistrationRequest extends FormikValues {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}

export type RegistrationResponse = DefaultUserResponse & {
  user: UserReduxState | null;
};

export interface LoginRequest extends FormikValues {
  login: string;
  password: string;
}

export type LoginResponse = DefaultUserResponse & {
  user: UserReduxState;
};

export type EditProfileRequest = Partial<UserServerState> & {
  token: UserToken;
};

export type EditProfileResponse = DefaultUserResponse & {};

export type EditUserFavoritesRequest = EditProfileRequest & {
  kinopoiskId: number;
  action: 'add' | 'remove';
};
