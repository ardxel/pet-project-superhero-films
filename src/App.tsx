import React from 'react';
import '@styles/main.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from '@pages/root/Admin';
import Header from './components/header/Header';
import Home from '@pages/home/Home';
import News from '@pages/news/News';
import { Provider } from 'react-redux';
import store from 'redux/store';

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="news" element={<News />} />
            <Route path="root" element={<Admin />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
