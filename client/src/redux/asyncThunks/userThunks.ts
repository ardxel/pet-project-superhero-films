import BASE_URL from '@constants/baseUrl';
import { UserCollection, UserReduxState } from '@models/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@reduxproj/store';
import axios from 'axios';
import { $Keys, ValuesType } from 'utility-types';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>();

export const preloadUserReduxState = createAppAsyncThunk<UserReduxState, void>(
  'user/preloadUserReduxState',
  async () => {
    const response = await axios.get(`${BASE_URL}/users/`);
    return (await response.data.data.user) as UserReduxState;
  }
);

export const changeUserCollections = createAppAsyncThunk<
  {
    newList: ValuesType<UserCollection>;
    listName: $Keys<UserCollection>;
  },
  {
    item: ValuesType<UserCollection[keyof UserCollection]>;
    listName: $Keys<UserCollection>;
    type?: 'add' | 'remove';
  }
>('user/changeUserCollections', async (values, { getState }) => {
  const { item, type, listName } = values;
  const { user } = (await getState()) as { user: UserReduxState };
  let newList = user[listName];

  switch (listName) {
    case 'favorites':
    case 'watchlist':
      if (type === 'remove') {
        newList = (newList as number[]).filter((favorite) => favorite !== item);
      }
      if (type === 'add') {
        newList = [...newList, item] as number[];
      }
      break;

    case 'ratings':
      // eslint-disable-next-line no-case-declarations
      let isMatchedRatingsItem = false;
      if (type === 'add' || !type) {
        newList = newList.map((listItem) => {
          if (typeof item === 'object') {
            if (listItem.id === item.id) {
              isMatchedRatingsItem = true;
              return { id: listItem.id, value: item.value };
            }
            return listItem;
          }
        });

        if (!isMatchedRatingsItem) {
          newList = [...newList, item] as { id: number; value: number }[];
        }
      }

      if (type === 'remove' && typeof item === 'object') {
        newList = (newList as { id: number; value: number }[]).filter(
          (listItem) => listItem.id !== item.id
        );
      }
      break;

    default:
      throw new Error(`List Name: ${listName} is invalid`);
  }

  return await axios
    .patch(`${BASE_URL}/users/`, { fields: { [listName]: newList } })
    .then((response) => {
      if (response.data.success) {
        return { newList, listName };
      } else throw new Error('Server error');
    })
    .catch((e) => {
      console.log(e);
      return { newList: user[listName], listName };
    });
});
