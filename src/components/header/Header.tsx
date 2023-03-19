import React, { useState } from 'react';
import styles from './header.module.scss';
import Navbar from './navbar/Navbar';
import useTheme from '@hooks/useTheme';
import Search from '../search/Search';
import {
  LogoButton,
  MenuButton,
  SearchButton,
  UserButton,
  ThemeButton,
} from './buttons/index';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Menu, MenuItem } from '@mui/material';
import { useAppSelector } from '@hooks/useAppSelector';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { logout } from 'redux/reducers/userReducer';
import { sleep } from 'common/tools';

const Header = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [anchorElem, setAnchorElem] = useState<HTMLButtonElement | null>(null);
  const { token, username } = useAppSelector((state) => state.user);
  const { changeTheme } = useTheme();
  const dispatch = useAppDispatch();

  const showNavbar = (): void => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
    }
    setIsNavbarOpen(!isNavbarOpen);
  };

  const showSearch = (): void => {
    setIsSearchOpen(!isSearchOpen);
  };

  const showUserMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElem(e.currentTarget);
  };

  const closeUserMenu = (): void => {
    setAnchorElem(null);
  };

  const handleLogout = (): void => {
    dispatch(logout());
    sleep().then(() => window.location.reload());
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <LogoButton className={styles.logo} link={'/'} />

        <Navbar isOpen={isNavbarOpen} setIsOpen={setIsNavbarOpen} />
        <Search isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />

        <div className={styles.interface}>
          <SearchButton className={styles.search} onClick={showSearch}>
            {isSearchOpen ? <CloseIcon /> : <SearchIcon />}
          </SearchButton>

          <ThemeButton className={styles.theme} onClick={changeTheme} />
          <UserButton
            id="basic-menu-button"
            className={[styles.userMenu, '.mui-fixed'].join(' ')}
            aria-owns={anchorElem ? 'userMenu' : undefined}
            aria-haspopup={true}
            onClick={showUserMenu}
            onMouseOver={showUserMenu}
          />

          <Menu
            id="userMenu"
            anchorEl={anchorElem}
            disableScrollLock={true}
            open={!!anchorElem}
            onClose={closeUserMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            MenuListProps={{
              'aria-labelledby': 'basic-menu-button',
              onMouseLeave: closeUserMenu,
            }}
          >
            {token && (
              <MenuItem>
                <Link to={`profile/${username}`}>profile</Link>
              </MenuItem>
            )}
            {!token && (
              <MenuItem>
                <Link to="/authorization">sign up</Link>
              </MenuItem>
            )}
            {token && <MenuItem onClick={handleLogout}>logout</MenuItem>}
          </Menu>

          <MenuButton className={styles.menu} onClick={showNavbar} />
        </div>
      </div>
    </header>
  );
};

export default Header;
