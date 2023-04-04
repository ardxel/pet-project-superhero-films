import { useEffect, useState } from 'react';
import getTheme from '@tools/getTheme';

const useTheme = (): { theme: string; changeTheme: () => void } => {
  const [theme, setTheme] = useState(
    getTheme({ light: 'light', dark: 'dark' })
  );

  const changeTheme = () => {
    if (theme === 'light') setTheme('dark');
    else setTheme('light');
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  return { theme, changeTheme };
};

export default useTheme;
