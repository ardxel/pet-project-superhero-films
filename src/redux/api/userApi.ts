import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import BASE_URL from '@constants/baseUrl';
import {
  RegistrationRequest,
  RegistrationResponse,
  LoginRequest,
  LoginResponse,
  EditProfileResponse,
  EditProfileRequest,
} from '@models/apiModels';
import { AlertColor } from '@mui/material';
import { UserReduxState } from '@models/User';

const getSeverityText: (statusCode: number) => AlertColor = (statusCode) => {
  if (statusCode === 200) return 'success';
  if (statusCode === 201) return 'warning';
  if (statusCode === 404) return 'error';
  else throw Error('this response code is not inspected');
};

type userInit = RegistrationResponse | LoginResponse | EditProfileResponse;

const userInitTransformResponse = (
  baseQueryReturnValue: {
    message: string;
    user: UserReduxState;
  },
  meta: FetchBaseQueryMeta
): userInit => {
  return {
    message: baseQueryReturnValue.message,
    severity: getSeverityText(meta?.response!.status),
    user: baseQueryReturnValue.user || null,
  };
};

export const userApi = createApi({
  reducerPath: 'api/user',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegistrationResponse, RegistrationRequest>({
      query: (values) => ({
        url: '/registration',
        method: 'Post',
        body: values,
      }),
      transformResponse: userInitTransformResponse,
    }),
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (values) => ({
        url: '/login',
        method: 'Post',
        body: values,
      }),
      transformResponse: userInitTransformResponse,
    }),
    getProfile: builder.query<UserReduxState, string>({
      query: (username) => ({
        url: `/getProfile/${username}`,
      }),
      transformResponse: (baseQueryReturnValue: { user: UserReduxState }) => {
        return baseQueryReturnValue.user;
      },
    }),
    editProfile: builder.mutation<EditProfileResponse, EditProfileRequest>({
      query: (values) => ({
        url: '/editProfile',
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
