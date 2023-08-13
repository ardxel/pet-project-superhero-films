import React, { memo } from 'react';
import { HeaderButtonType } from './ButtonType';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';

const UserButton: HeaderButtonType = ({ className, onClick, ...rest }) => {
  return (
    <IconButton className={className} onClick={onClick} {...rest}>
      <AccountCircleIcon />
    </IconButton>
  );
};

export default memo(UserButton);
