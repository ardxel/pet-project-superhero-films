import React, { createRef, useEffect } from 'react';
import styles from './navbar.module.scss';
import { Link } from 'react-router-dom';
import { CrossSVG } from '@images/index';
import navLinks from '@constants/navLinks';

interface INavbarProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

export default function Navbar({ isOpen, setIsOpen }: INavbarProps) {
  return (
    <nav className={`${styles.nav} ${isOpen && styles.open}`}>
      <ul className={`${styles.links}`}>
        {navLinks.map((item, index) => {
          if (!isOpen && index === navLinks.length - 1) return;
          const { id, name, path } = item;
          return (
            <li key={id}>
              <Link to={path}>{name}</Link>
            </li>
          );
        })}
      </ul>
      {isOpen && (
        <button className={styles.closed} onClick={() => setIsOpen(false)}>
          <CrossSVG />
        </button>
      )}
    </nav>
  );
}
