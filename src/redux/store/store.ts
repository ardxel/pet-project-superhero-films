import { configureStore } from '@reduxjs/toolkit';
import {movieSlice} from '../reducers/movieReducer';

const store = configureStore({
  reducer: {
    [movieSlice.name]: movieSlice.reducer
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
