import React, { memo } from 'react';
import { HeaderButtonType } from './ButtonType';
import { Link } from 'react-router-dom';
import { LogoSVG } from '@images/index';
import { IconButton } from '@mui/material';

const LogoButton: HeaderButtonType = ({ className }) => {
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

export default memo(LogoButton);
