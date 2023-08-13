import { useCallback, useState } from 'react';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { sleep } from '@tools/sleep';
import { changeUserCollections } from '@reduxproj//asyncThunks/userThunks';
import { UserCollection, UserToken } from '@models/User';
import { $Keys, ValuesType, $NonMaybeType } from 'utility-types';
import { validate as uuidValidate } from 'uuid';

type UserCollectionKeysStateType = keyof UserCollection | null;

export default function useUserProfile() {
  // when changing collections, the state is set which collection was changed for the correct isLoading
  const [collectionItemLoading, setCollectionItemLoading] = useState<UserCollectionKeysStateType>(null);

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
        .then(() => setCollectionItemLoading(listName))
        .then(sleep.bind(null, 500))
        // TODO
        .then(() => {
          if (typeof item === 'object') {
            const type = item.value > -1 ? 'add' : 'remove';
            dispatch(changeUserCollections({ item, listName, type }));
            throw new Error('break');
          }
        })
        .then(() => {
          let value;
          if (typeof item === 'number') {
            value = !(userState[listName] as number[]).includes(item);
          }
          const type = value ? 'add' : 'remove';

          dispatch(changeUserCollections({ item, listName, type }));
        })
        .catch((e) => {
          if (e.message !== 'break') {
            console.log(e);
          }
        })
        .finally(() => sleep(500).then(() => {
          setIsLoading(false);
          setCollectionItemLoading(null);
        }));
    },
    [userState]
  );

  return {
    userState,
    isAuthorized,
    handleChangeUserCollection,
    isLoading,
    collectionItemLoading
  };
}
