import React from 'react';
import ButtonType from '@components/header/buttons/ButtonType';
import { ThemeSVG } from '@images/index';

interface ThemeButtonProps extends ButtonType {}

const ThemeButton: React.FC<ThemeButtonProps> = ({ className, onClick }) => {
  return (
    <button className={className as string} onClick={onClick}>
      <ThemeSVG />
    </button>
  );
};

export default ThemeButton;
