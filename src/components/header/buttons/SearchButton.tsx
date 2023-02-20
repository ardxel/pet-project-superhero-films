import React from 'react';
import ButtonType from '@components/header/buttons/ButtonType';

interface  SearchButtonProps extends ButtonType {};

const SearchButton: React.FC<SearchButtonProps> = ({children, className, onClick}) => {

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}

export default SearchButton;