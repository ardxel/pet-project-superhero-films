import { UserReduxState } from '@models/User';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { authorization, login, logout, registration } from '@reduxproj/api/user.api';

interface UserState {
  user: UserReduxState;
  isAuthorized: boolean;
  isLoading: boolean;
  isError: boolean;
  error: any;
  errorMessage: string | null;
}

export const userInitialState: UserState = {
  user: {
    username: '',
    email: '',
    favorites: [],
    watchlist: [],
    ratings: [],
  },
  isAuthorized: false,
  isLoading: false,
  isError: false,
  error: null,
  errorMessage: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registration.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      }
      state.isLoading = false;
      state.isAuthorized = true;
      state.errorMessage = null;
      state.isError = false;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      }
      state.isLoading = false;
      state.isAuthorized = true;
      state.errorMessage = null;
      state.isError = false;
    });

    builder.addCase(authorization.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      }
      state.isLoading = false;
      state.isAuthorized = true;
      state.errorMessage = null;
      state.isError = false;
    });
    builder.addCase(logout.fulfilled, () => {
      return userInitialState;
    });
  },
});
export const { setLoading, setIsError } = userSlice.actions;
export const userReducer = userSlice.reducer;
export default userSlice;
