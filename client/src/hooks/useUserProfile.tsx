import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { IUser } from '@models/User';
import { changeUser } from '@reduxproj/api/user.api';
import { useState } from 'react';

export default function useUserProfile() {
  /*
   * when changing collections, the state is set which collection was changed for the correct isLoading
   */
  const [loadingFieldChanges, setLoadingFieldChanges] = useState<keyof IUser | null>(null);
  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const loadingChanges = Boolean(loadingFieldChanges);

  function handleChangeUser<T extends IUser = IUser, K extends keyof T = keyof T>(key: K, value: T[K]) {
    setLoadingFieldChanges(key as keyof IUser);
    dispatch(changeUser({ [key]: value }));
    setLoadingFieldChanges(null);
  }

  return {
    ...userState,
    loadingChanges,
    handleChangeUser,
    loadingFieldChanges,
  };
}
