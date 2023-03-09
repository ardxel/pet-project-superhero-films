import React from 'react';
import ButtonType from '@components/header/buttons/ButtonType';
import { IconButton } from '@mui/material';

interface SearchButtonProps extends ButtonType {}

const SearchButton: React.FC<SearchButtonProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <IconButton className={className} onClick={onClick}>
      {children}
    </IconButton>
  );
};

export default SearchButton;
