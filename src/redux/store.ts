import { configureStore } from '@reduxjs/toolkit';
import { moviesApi } from 'redux/actions/moviesApi';
import newsSlice from 'redux/reducers/newsReducer';

const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    [newsSlice.name]: newsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(moviesApi.middleware);
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
