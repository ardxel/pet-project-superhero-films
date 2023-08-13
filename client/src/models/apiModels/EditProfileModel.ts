import { UserServerState, UserToken } from '@models/User';
import { DefaultUserResponse } from './DefaultUserResponse';

export type EditProfileRequest = Partial<UserServerState> & {
  token: UserToken;
};

export type EditProfileResponse = DefaultUserResponse & {};