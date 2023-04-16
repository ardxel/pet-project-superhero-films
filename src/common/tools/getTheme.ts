const getTheme = function <S extends 'light' | 'dark'>(themes: {
  [key: string]: S;
}): S {
  // The item 'theme' is checked in local storage.
  // If there is, it is returned
  const theme = JSON.parse(`${window.localStorage.getItem('theme')}`);
  if (Object.values(themes).includes(theme)) return theme;

  const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
  if (userMedia.matches) return themes.light;
  return themes.dark;
};

export default getTheme;
