const getTokenFromLocalStorage = (): string | null => {
  const token = JSON.parse(localStorage.getItem('user') || 'null');
  return !token ? null : (token as string);
};

export default getTokenFromLocalStorage;
