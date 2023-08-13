import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserReduxState } from '@models/User';
import {
  preloadUserReduxState,
  changeUserCollections,
} from '@reduxproj/asyncThunks/userThunks';

export const userInitialState: UserReduxState = {
  token: null,
  username: null,
  name: null,
  avatar: null,
  favorites: [],
  watchlist: [],
  ratings: [],
  biography: '',
  gender: '',
  country: '',
  birthday: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    registration(_, action: PayloadAction<UserReduxState>) {
      return action.payload;
    },
    login(_, action: PayloadAction<UserReduxState>) {
      return action.payload;
    },
    logout() {
      return userInitialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(preloadUserReduxState.fulfilled, (_, { payload }) => {
      return payload as UserReduxState;
    });
    builder.addCase(changeUserCollections.fulfilled, (state, { payload }) => {
      const { newList, listName } = payload;
      if (listName === 'favorites') {
        state.favorites = newList as number[];
      }
      if (listName === 'watchlist') {
        state.watchlist = newList as number[];
      }
      if (listName === 'ratings') {
        state.ratings = newList as { id: number; value: number }[];
      }
    });
  },
});

export const userReducer = userSlice.reducer;

export const { registration, login, logout } = userSlice.actions;

export default userSlice;
