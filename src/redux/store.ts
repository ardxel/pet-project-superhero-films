import { configureStore } from '@reduxjs/toolkit';
import { moviesApi } from 'redux/api/moviesApi';
import { userApi } from 'redux/api/userApi';
import newsSlice from 'redux/reducers/newsReducer';
import userSlice from 'redux/reducers/userReducer';
import { listenerMiddleware } from 'redux/middleware';
import { preloadUserReduxState } from 'redux/asyncThunks/userThunks';
import { getTokenFromLocalStorage } from 'common/tools';

const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [newsSlice.name]: newsSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      listenerMiddleware.middleware,
      moviesApi.middleware,
      userApi.middleware
    ),
});

(() => {
  const token = getTokenFromLocalStorage();
  if (token) {
    store.dispatch(preloadUserReduxState(token));
  }
})();

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
