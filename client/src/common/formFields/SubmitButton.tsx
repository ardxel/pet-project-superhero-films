import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import superstyles from '@styles/superstyles.module.scss';

type SubmitButtonProps = ButtonProps & {};

const SubmitButton: React.FC<SubmitButtonProps> = ({ ...props }) => {
  return (
    <Button
      {...props}
      variant="contained"
      type="submit"
      className={superstyles.button}
    >
      {props.children || 'submit'}
    </Button>
  );
};

export default SubmitButton;
