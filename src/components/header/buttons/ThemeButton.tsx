import React from 'react';
import { HeaderButtonType } from './ButtonType';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IconButton } from '@mui/material';

const ThemeButton: HeaderButtonType = ({ className, onClick }) => {
  return (
    <IconButton className={className as string} onClick={onClick}>
      <DarkModeIcon />
    </IconButton>
  );
};

export default ThemeButton;
