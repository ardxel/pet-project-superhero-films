import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import BASE_URL from '@constants/baseUrl';
import {
  RegistrationRequest,
  RegistrationResponse,
  LoginRequest,
  LoginResponse,
} from 'models/formModels';
import { AlertColor } from '@mui/material';
import { UserReduxState, UserToken } from 'models/User';

const getSeverityText: (statusCode: number) => AlertColor = (statusCode) => {
  if (statusCode === 200) return 'success';
  if (statusCode === 201) return 'warning';
  if (statusCode === 404) return 'error';
  else throw Error('this response code is not inspected');
};

export const userApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegistrationResponse, RegistrationRequest>({
      query: (values) => ({
        url: '/registration',
        method: 'Post',
        body: values,
      }),
      transformResponse: (
        baseQueryReturnValue: { message: string; user: UserReduxState },
        meta
      ) => {
        const message = baseQueryReturnValue.message;
        const user = baseQueryReturnValue.user || null;
        const severity = getSeverityText(meta!.response!.status);

        return { severity, message, user };
      },
    }),
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (values) => ({
        url: '/login',
        method: 'Post',
        body: values,
      }),
      transformResponse: (
        baseQueryReturnValue: { message: string; user: UserReduxState },
        meta
      ) => {
        const message = baseQueryReturnValue.message;
        const severity = getSeverityText(meta!.response!.status);
        const user = baseQueryReturnValue.user || null;
        return { severity, message, user };
      },
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = userApi;
