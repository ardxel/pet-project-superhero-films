import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { login, logout, registration } from '@reduxproj/reducers/user.reducer';
import type { RootState } from './store';

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(registration, logout, login),
  effect: (_, listenerApi) => {
    localStorage.setItem('user', JSON.stringify((listenerApi.getState() as RootState).user.token as string));
  },
});

export default listenerMiddleware.middleware;
