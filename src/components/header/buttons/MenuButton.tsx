import React, { memo } from 'react';
import { HeaderButtonType } from './ButtonType';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

const MenuButton: HeaderButtonType = ({ className, onClick }) => {
  return (
    <IconButton className={className} onClick={onClick}>
      <MenuIcon />
    </IconButton>
  );
};

export default memo(MenuButton);
