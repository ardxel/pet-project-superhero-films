import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Movie from 'types/Movie';
import { UserReduxState } from 'types/User';
import { preloadUserReduxState } from 'redux/actions/loadUserStateData';

export const userInitialState: UserReduxState = {
  token: null,
  avatar: null,
  favorites: [] as Movie[]
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    registration: (state, action: PayloadAction<UserReduxState>) => {
      return { ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(preloadUserReduxState.fulfilled, (state, { payload }) => {
        return { ...payload };
      });
  }
});

export const { registration } = userSlice.actions;

export default userSlice;