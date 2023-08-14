import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IconButton } from '@mui/material';
import { memo } from 'react';
import { HeaderButtonType } from './ButtonType';

const ThemeButton: HeaderButtonType = ({ className, onClick }) => {
  // const location = useLocation();
  // const isMoviePage = location.pathname.includes('movie');
  return (
    <IconButton className={className as string} onClick={onClick}>
      <DarkModeIcon />
    </IconButton>
  );
};

export default memo(ThemeButton);
