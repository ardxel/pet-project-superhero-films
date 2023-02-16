import { configureStore } from '@reduxjs/toolkit';
import { moviesApi } from 'redux/actions/moviesApi';
import {newsApi} from 'redux/actions/newsApi';


const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(newsApi.middleware, moviesApi.middleware)
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;


