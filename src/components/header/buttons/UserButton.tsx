import React from 'react';
import ButtonType from '@components/header/buttons/ButtonType';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';

interface SignInButtonProps extends ButtonType {}

const UserButton: React.FC<SignInButtonProps> = ({
  className,
  onClick,
  ...rest
}) => {
  return (
    <IconButton className={className} onClick={onClick} {...rest}>
      <AccountCircleIcon />
    </IconButton>
  );
};

export default UserButton;
