import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { registration, logout, login } from 'redux/reducers/userReducer';

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(registration, logout, login),
  effect: (_, listenerApi) => {
    localStorage.setItem(
      'user',
      JSON.stringify((listenerApi.getState() as RootState).user.token as string)
    );
  },
});
