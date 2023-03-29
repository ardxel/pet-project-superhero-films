import { useCallback, useState } from 'react';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { sleep } from 'common/tools';
import { changeUserCollections } from 'redux/asyncThunks/userThunks';
import { UserCollection } from 'models/User';

export default function useUserProfile() {
  const userState = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isAuthorized = Boolean(userState.token && userState.username);

  const userCollectionHandler = useCallback(
    (argId: number, listName: keyof UserCollection) => {
      console.log('description state: ', userState);
      sleep()
        .then(() => setIsLoading(true))
        .then(sleep.bind(null, 500))
        .then(() => userState[listName].includes(argId))
        .then((value) => !value)
        .then((value) => sleep(500).then(() => value))
        .then((value) => {
          const type: 'add' | 'remove' = value ? 'add' : 'remove';
          dispatch(
            changeUserCollections({
              token: userState.token,
              action: { id: argId, type: type, listName: listName },
            })
          );
        })
        .then(() => setIsLoading(false));
    },
    [userState]
  );

  return {
    userState,
    isAuthorized,
    userCollectionHandler,
    isLoading,
  };
}
