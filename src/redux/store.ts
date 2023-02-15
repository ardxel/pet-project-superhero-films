import { configureStore } from '@reduxjs/toolkit';
import {movieSlice} from 'redux/reducers/movieReducer';
import { moviesApi } from 'redux/api/moviesApi';

const store = configureStore({
  reducer: {
    [movieSlice.name]: movieSlice.reducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(moviesApi.middleware)
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;


