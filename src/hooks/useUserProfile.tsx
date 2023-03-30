import { useCallback, useState } from 'react';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { sleep } from 'common/tools';
import { changeUserCollections } from 'redux/asyncThunks/userThunks';
import { UserCollection, UserToken } from 'models/User';
import { $Keys, ValuesType, $NonMaybeType } from 'utility-types';
import { validate as uuidValidate } from 'uuid';

export default function useUserProfile() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const isAuthorized = uuidValidate(
    userState.token as $NonMaybeType<UserToken>
  );

  const handleChangeUserCollection = useCallback(
    (
      item: ValuesType<UserCollection[$Keys<UserCollection>]>,
      listName: $Keys<UserCollection>
    ) => {
      sleep()
        .then(() => setIsLoading(true))
        .then(sleep.bind(null, 500))
        // TODO
        .then(() => {
          if (typeof item === 'object') {
            dispatch(changeUserCollections({ item, listName }));
            throw new Error('break');
          }
        })
        .then(() => {
          let value;
          if (typeof item === 'number') {
            value = !(userState[listName] as number[]).includes(item);
          }
          const type: 'add' | 'remove' = value ? 'add' : 'remove';
          console.log('lol');
          dispatch(changeUserCollections({ item, listName, type }));
        })
        .catch((e) => {
          if (e.message !== 'break') {
            console.log(e);
          }
        })
        .finally(() => sleep(500).then(() => setIsLoading(false)));
    },
    [userState]
  );

  return {
    userState,
    isAuthorized,
    handleChangeUserCollection,
    isLoading,
  };
}
