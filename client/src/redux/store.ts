import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  moviesApiMiddleware,
  moviesApiName,
  moviesApiReducer,
} from '@reduxproj/api/moviesApi';
import {
  userApiMiddleware,
  userApiName,
  userApiReducer,
} from '@reduxproj/api/userApi';
import { newsReducer } from '@reduxproj/reducers/newsReducer';
import { userReducer } from '@reduxproj/reducers/userReducer';
import listenerMiddleware from '@reduxproj/middleware';
import { preloadUserReduxState } from '@reduxproj/asyncThunks/userThunks';
import getTokenFromLocalStorage from '@tools/getTokenFromLocalStorage';

export const rootReducer = combineReducers({
  user: userReducer,
  news: newsReducer,
  [userApiName]: userApiReducer,
  [moviesApiName]: moviesApiReducer,
});

export const middlewareCombiner = [
  listenerMiddleware,
  moviesApiMiddleware,
  userApiMiddleware,
];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...middlewareCombiner),
});

(() => {
  const token = getTokenFromLocalStorage();
  if (token) {
    store.dispatch(preloadUserReduxState(token));
  }
})();

export default store;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
