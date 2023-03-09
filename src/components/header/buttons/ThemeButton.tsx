import React from 'react';
import ButtonType from '@components/header/buttons/ButtonType';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IconButton } from '@mui/material';
interface ThemeButtonProps extends ButtonType {}

const ThemeButton: React.FC<ThemeButtonProps> = ({ className, onClick }) => {
  return (
    <IconButton className={className as string} onClick={onClick}>
      <DarkModeIcon />
    </IconButton>
  );
};

export default ThemeButton;
