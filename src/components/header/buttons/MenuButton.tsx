import React from 'react';
import ButtonType from '@components/header/buttons/ButtonType';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

interface MenuButtonProps extends ButtonType {}

const MenuButton: React.FC<MenuButtonProps> = ({ className, onClick }) => {

  return (
    <IconButton className={className} onClick={onClick}>
      <MenuIcon />
    </IconButton>
  );
};

export default MenuButton;
