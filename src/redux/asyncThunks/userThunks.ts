import axios from 'axios';
import BASE_URL from '@constants/baseUrl';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserReduxState, UserToken } from 'models/User';

export const preloadUserReduxState = createAsyncThunk<
  UserReduxState,
  UserToken
>('user/preloadUserReduxState', async (token: UserToken) => {
  const response = await axios.get(`${BASE_URL}/getUserState/${token}`);
  return (await response.data) as UserReduxState;
});
