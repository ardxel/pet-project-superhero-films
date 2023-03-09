import React from 'react';
import { ButtonProps } from '@mui/material';

type ButtonType = ButtonProps & {
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  link?: string;
};

export default ButtonType;
