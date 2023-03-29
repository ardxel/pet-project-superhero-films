import React, { useEffect, useRef, useState } from 'react';
import styles from './header.module.scss';
import muiStyles from 'common/formFields/styles';
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
import { Menu, MenuItem, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { logout } from 'redux/reducers/userReducer';
import { sleep } from 'common/tools';
import { useNavigate } from 'react-router';
import useUserProfile from '@hooks/useUserProfile';

const Header = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [anchorElem, setAnchorElem] = useState<HTMLButtonElement | null>(null);
  const { userState, isAuthorized } = useUserProfile();
  const navigate = useNavigate();
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
    sleep().then(() => navigate('/'));
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Paper
          elevation={6}
          sx={{ height: '100%', backgroundColor: 'inherit' }}
        >
          <LogoButton className={styles.logo} link={'/'} />

          <Navbar
            username={userState.username || null}
            isOpen={isNavbarOpen}
            setIsOpen={setIsNavbarOpen}
          />
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
              sx={muiStyles.menu}
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
              {isAuthorized && (
                <MenuItem>
                  <Link
                    style={{ color: 'var(--color13)' }}
                    to={`profile/${userState.username}`}
                  >
                    Profile
                  </Link>
                </MenuItem>
              )}
              {!isAuthorized && (
                <MenuItem>
                  <Link style={{ color: 'var(--color13)' }} to="/authorization">
                    Sign up
                  </Link>
                </MenuItem>
              )}
              {isAuthorized && (
                <MenuItem>
                  <Link
                    style={{ color: 'var(--color13)' }}
                    to=""
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </MenuItem>
              )}
            </Menu>

            <MenuButton className={styles.menu} onClick={showNavbar} />
          </div>
        </Paper>
      </div>
    </header>
  );
};

export default Header;
