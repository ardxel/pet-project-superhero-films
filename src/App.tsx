import React, { Suspense } from 'react';
import '@styles/main.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from '@common/scroll-to-top/ScrollToTop';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import { Provider } from 'react-redux';
import store from '@reduxproj/store';
import appRoutes from './AppRoutes';
import ReactLoading from 'react-loading';

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Provider store={store}>
      <Header />
      <Suspense fallback={<ReactLoading type='balls' />}>
        <Routes>
          {appRoutes.map(({ path, Element, index }, i) => {
            return <Route key={i} index={index} path={path}
                          element={<Element />} />;
          })}
        </Routes>
      </Suspense>
      <Footer />
    </Provider>
  </BrowserRouter>
);

export default App;
