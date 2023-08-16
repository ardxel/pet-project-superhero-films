import { IUser, UserReduxState } from '@models/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setIsError, setLoading } from '@reduxproj/reducers/user.reducer';
import { AppDispatch, RootState } from '@reduxproj/store';
import instance, { BaseResponse } from './config';
interface AuthResponse
  extends BaseResponse<{
    user: UserReduxState;
    token: string;
  }> {}

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>();

export const registration = createAppAsyncThunk<
  UserReduxState | undefined,
  Record<'email' | 'username' | 'password', string>
>('user/signUp', async function (body, thunkAPI) {
  try {
    thunkAPI.dispatch(setLoading(true));
    const response = await instance.put<AuthResponse>('/users', body);
    if (response.data.success) {
      return response.data.data.user;
    } else {
      throw new Error(response.data.error || response.data.message);
    }
  } catch (error) {
    console.log(error);
    thunkAPI.dispatch(setIsError(true));
    thunkAPI.rejectWithValue(error);
  }
});

export const login = createAsyncThunk<UserReduxState | undefined, Record<'emailOrUsername' | 'password', string>>(
  'user/signIn',
  async function (body, thunkAPI) {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await instance.post<AuthResponse>('/users', body);

      if (response.data.success) {
        return response.data.data.user;
      } else {
        throw new Error(response.data.error || response.data.message);
      }
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(setIsError(true));
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const authorization = createAsyncThunk('user/auth', async function (_, thunkAPI) {
  try {
    thunkAPI.dispatch(setLoading(true));
    const response = await instance.get<AuthResponse>('/users');

    if (response.data.success) {
      return response.data.data.user;
    } else {
      throw new Error(response.data.error || response.data.message);
    }
  } catch (error) {
    console.log(error);
    thunkAPI.dispatch(setIsError(true));
    thunkAPI.rejectWithValue(error);
  }
});

export const logout = createAsyncThunk('user/logout', async function (_, thunkAPI) {
  localStorage.removeItem('token');
});

export const fetchUserProfile = async (username: IUser['username']): Promise<UserReduxState | undefined> => {
  try {
    const response = await instance.get<BaseResponse<{ user: UserReduxState }>>(`/users/profile/${username}`);
    if (response.data.success) {
      return response.data.data.user;
    } else {
      return undefined;
    }
  } catch (error) {
    console.log(error);
  }
};

export const changeUser = createAppAsyncThunk<UserReduxState | undefined, Partial<IUser>>(
  'user/changeUser',
  async function (fields, thunkAPI) {
    try {
      const response = await instance.patch<BaseResponse<{ user: UserReduxState }>>('/users/profile', fields);
      if (response.data.success) {
        return response.data.data.user;
      }
    } catch (error) {
      console.log(error);
    }
  },
);
