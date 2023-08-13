import { UserToken } from '@models/User';

const getTokenFromLocalStorage: () => UserToken = () => {
  const token = JSON.parse(localStorage.getItem('user') || 'null');
  return !token ? null : (token as string);
};

export default getTokenFromLocalStorage;
