import React from 'react';
import ButtonType from '@components/header/buttons/ButtonType';
import { Link } from 'react-router-dom';
import { LogoSVG } from '@images/index';

interface  LogoButtonProps extends ButtonType {}

const LogoButton: React.FC<LogoButtonProps> = ({className, link}) => {
  return (
    <button className={className}>
      <Link to={link || '/'}>
        <LogoSVG/>
      </Link>
    </button>
  )
}

export default LogoButton;