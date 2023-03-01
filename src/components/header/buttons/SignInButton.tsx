import React from 'react';
import ButtonType from '@components/header/buttons/ButtonType';
import { LoginSVG } from '@images/index';
import { Link } from 'react-router-dom';

interface SignInButtonProps extends ButtonType {}

const SignInButton: React.FC<SignInButtonProps> = ({
  className,
  onClick,
  link,
}) => {
  return (
    <button className={className} onClick={onClick}>
      <Link to={link || '/'}>
        <LoginSVG />
      </Link>
    </button>
  );
};

export default SignInButton;
