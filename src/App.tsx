import React from 'react';
import '@styles/main.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from '@common/scroll-to-top/ScrollToTop';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import Admin from '@pages/root/Admin';
import HomePage from '@pages/home/Home';
import NewsPage from '@pages/news/News';
import MoviePage from '@pages/movie-page/MoviePage';
import ProfilePage from '@pages/profile/Profile';
import AuthorizationPage from '@pages/authorization/Authorization';
import { Provider } from 'react-redux';
import store from '@reduxproj//store';

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Provider store={store}>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/authorization" element={<AuthorizationPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="root" element={<Admin />} />
      </Routes>
      <Footer />
    </Provider>
  </BrowserRouter>
);

export default App;
