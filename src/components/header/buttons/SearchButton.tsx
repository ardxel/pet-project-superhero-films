import React, { memo } from 'react';
import { HeaderButtonType } from './ButtonType';
import { IconButton } from '@mui/material';

const SearchButton: HeaderButtonType = ({ children, className, onClick }) => {
  return (
    <IconButton className={className} onClick={onClick}>
      {children}
    </IconButton>
  );
};

export default memo(SearchButton);
