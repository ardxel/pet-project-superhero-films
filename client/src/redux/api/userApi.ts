import BASE_URL from '@constants/baseUrl';
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';

import {
  EditProfileRequest,
  EditProfileResponse,
} from '@models/apiModels/EditProfileModel';
import { LoginRequest, LoginResponse } from '@models/apiModels/LoginModel';
import {
  RegistrationRequest,
  RegistrationResponse,
} from '@models/apiModels/RegistrationModel';
import { UserReduxState } from '@models/User';
import { AlertColor } from '@mui/material';

const getSeverityText: (statusCode: number) => AlertColor = (statusCode) => {
  if (statusCode === 200) return 'success';
  if (statusCode === 201) return 'warning';
  if (statusCode === 404) return 'error';
  else throw Error('this response code is not inspected');
};

type UserInitType = RegistrationResponse | LoginResponse | EditProfileResponse;

const userInitTransformResponse = (
  baseQueryReturnValue: {
    message: string;
    user: UserReduxState;
  },
  meta: FetchBaseQueryMeta
): UserInitType => {
  return {
    message: baseQueryReturnValue.message,
    // severity: getSeverityText(meta?.response!.status),
    data: { user: baseQueryReturnValue.user },
  };
};

export const userApi = createApi({
  reducerPath: 'api/user',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegistrationResponse, RegistrationRequest>({
      query: (values) => ({
        url: '/users',
        method: 'patch',
        body: values,
      }),
      transformResponse: userInitTransformResponse,
    }),
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (values) => ({
        url: '/users',
        method: 'post',
        body: values,
      }),
      transformResponse: userInitTransformResponse,
    }),
    getProfile: builder.query<UserReduxState, string>({
      query: (username) => ({
        url: `/users/profile/${username}`,
      }),
      transformResponse: (baseQueryReturnValue: { user: UserReduxState }) => {
        return baseQueryReturnValue.user;
      },
    }),
    editProfile: builder.mutation<EditProfileResponse, EditProfileRequest>({
      query: (values) => ({
        url: '/users/',
        method: 'Post',
        body: values,
      }),
      transformResponse: userInitTransformResponse,
    }),
  }),
});

export const userApiName = userApi.reducerPath;

export const userApiReducer = userApi.reducer;

export const userApiMiddleware = userApi.middleware;

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useEditProfileMutation,
  useLazyGetProfileQuery,
} = userApi;
