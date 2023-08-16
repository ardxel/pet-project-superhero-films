import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { newsReducer } from '@reduxproj/reducers/news.reducer';
import { userReducer } from '@reduxproj/reducers/user.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  news: newsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
