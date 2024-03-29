import { render, RenderOptions } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppStore, middlewareCombiner, RootState } from '@reduxproj/store';
import { userInitialState } from '@reduxproj/reducers/userReducer';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { rootReducer } from '@reduxproj/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  memoryRouterOptions?: MemoryRouterProps;
  preloadedState?: PreloadedState<RootState>;
  store?: ReturnType<typeof configureStore> | AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      user: userInitialState,
    },
    memoryRouterOptions,
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewareCombiner),
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <MemoryRouter {...memoryRouterOptions}>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
