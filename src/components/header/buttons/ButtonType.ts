import React from 'react';

type ButtonType = {
  children?: React.ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  link?: string
}

export default ButtonType;