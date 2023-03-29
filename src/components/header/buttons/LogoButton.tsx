import React from 'react';
import ButtonType from '@components/header/buttons/ButtonType';
import { Link } from 'react-router-dom';
import { LogoSVG } from '@images/index';
import { IconButton } from '@mui/material';

interface LogoButtonProps extends ButtonType {}

const LogoButton: React.FC<LogoButtonProps> = ({ className, link }) => {
  return (
    <IconButton
      className={className}
      disableTouchRipple={true}
      disableRipple={true}
      disableFocusRipple={true}
    >
      <Link to="/">
        <LogoSVG />
      </Link>
    </IconButton>
  );
};

export default LogoButton;
