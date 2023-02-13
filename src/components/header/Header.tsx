import React, { createRef, FC, useState } from 'react';
import { Outlet } from 'react-router';
import styles from './header.module.scss';
import Navbar from './navbar/Navbar';
import { Link } from 'react-router-dom';
import {
  CrossSVG,
  LogoSVG,
  SearchSVG,
  ThemeSVG,
  LoginSVG,
} from '@images/index';
import MenuIcon from '../icons/MenuIcon';
import useTheme from '@hooks/useTheme';
import Search from '../search/Search';

const Header: FC = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const { theme, changeTheme } = useTheme();

  const showNavbar = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
      setIsNavbarOpen(!isNavbarOpen);
    } else setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link to="/">
              <LogoSVG />
            </Link>
          </div>
          <Navbar isOpen={isNavbarOpen} setIsOpen={setIsNavbarOpen} />
          {isSearchOpen && <Search />}
          <div className={styles.right}>
            <button
              className={styles.search}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <CrossSVG /> : <SearchSVG />}
            </button>
            <button
              className={styles.theme}
              onClick={changeTheme}
              title={theme}
            >
              <ThemeSVG />
            </button>
            <button className={styles.signIn}>
              <Link to="/">
                <LoginSVG />
              </Link>
            </button>
            <button className={styles.menu} onClick={showNavbar}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
