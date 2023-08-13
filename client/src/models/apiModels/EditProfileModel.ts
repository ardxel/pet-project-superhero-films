import { UserReduxState, UserServerState } from '@models/User';
import { DefaultResponse } from './DefaultUserResponse';

export type EditProfileRequest = Partial<UserServerState>;
export type EditProfileResponse = DefaultResponse<{ user: UserReduxState }>;
