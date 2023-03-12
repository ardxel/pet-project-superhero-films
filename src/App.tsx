import React from 'react';
import '@styles/main.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from 'common/scroll-to-top/ScrollToTop';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import Admin from '@pages/root/Admin';
import Home from '@pages/home/Home';
import News from '@pages/news/News';
import MoviePage from '@pages/movie-page/MoviePage';
import Authorization from '@pages/authorization/Authorization';
import { Provider } from 'react-redux';
import store from 'redux/store';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Provider store={store}>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/authorization" element={<Authorization />} />
          <Route path="root" element={<Admin />} />
        </Routes>
        <Footer />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
