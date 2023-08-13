import React from 'react';
import { ButtonProps } from '@mui/material';

export type HeaderButtonType = React.FC<
  ButtonProps & {
    children?: React.ReactNode;
    className?: string;
    onClick?:
      | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
      | undefined;
    link?: string;
  }
>;
