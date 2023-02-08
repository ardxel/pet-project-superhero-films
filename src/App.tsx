import React from 'react';
import '@styles/main.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from '@components/root/Admin';
import Header from '@components/Header/Header';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}></Route>
        <Route path="root" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
