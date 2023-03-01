import React from 'react';
import ButtonType from '@components/header/buttons/ButtonType';
import { MenuSVG } from '@images/index';

interface MenuButtonProps extends ButtonType {}

const MenuButton: React.FC<MenuButtonProps> = ({ className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      <MenuSVG />
    </button>
  );
};

export default MenuButton;
