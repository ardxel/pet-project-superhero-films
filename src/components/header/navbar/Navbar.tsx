import React, { useEffect } from 'react';
import styles from './navbar.module.scss';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import navLinks from '@constants/navLinks';
import { disableScroll, enableScroll } from '@tools/scroll-lock';
interface NavbarProps {
  username: string | null;
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ username, isOpen, setIsOpen }) => {
  useEffect(() => {
    isOpen ? disableScroll() : enableScroll();
  }, [isOpen]);
  return (
    <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
      <ul className={`${styles.links}`}>
        {navLinks.map((item, index) => {
          const isLastItem = index === navLinks.length - 1;
          if (!isOpen && isLastItem) return;

          if (isOpen && isLastItem && username) {
            return (
              <li key={item.id}>
                <Link
                  to={`/profile/${username}`}
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
              </li>
            );
          }
          const { id, name, path } = item;
          return (
            <li key={id}>
              <Link to={path} onClick={() => setIsOpen(false)}>
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
      {isOpen && (
        <button className={styles.closed} onClick={() => setIsOpen(false)}>
          <CloseIcon />
        </button>
      )}
    </nav>
  );
};

export default Navbar;
