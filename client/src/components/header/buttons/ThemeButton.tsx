import React, { memo } from 'react';
import { HeaderButtonType } from './ButtonType';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IconButton } from '@mui/material';
import { useLocation } from 'react-router';

const ThemeButton: HeaderButtonType = ({ className, onClick }) => {
  const location = useLocation();
  const isMoviePage = location.pathname.includes('movie');
  return (
    <IconButton className={className as string} onClick={onClick}>
      <DarkModeIcon />
    </IconButton>
  );
};

export default memo(ThemeButton);
