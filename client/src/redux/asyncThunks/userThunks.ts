import axios from 'axios';
import BASE_URL from '@constants/baseUrl';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { $Keys, ValuesType } from 'utility-types';
import { UserCollection, UserReduxState, UserToken } from '@models/User';
import { AppDispatch, RootState } from '@reduxproj/store';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>();

export const preloadUserReduxState = createAppAsyncThunk<
  UserReduxState,
  UserToken
>('user/preloadUserReduxState', async (token: UserToken) => {
  const response = await axios.get(`${BASE_URL}/getUserState/${token}`);
  return (await response.data) as UserReduxState;
});

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
      newList = (newList as {id: number, value: number}[]).filter((listItem) => listItem.id !== item.id);
    }
    break;

  default:
    throw new Error(`List Name: ${listName} is invalid`);
  }

  return await axios
    .post(`${BASE_URL}/editProfile`, { token: user.token, [listName]: newList })
    .then((response) => {
      if (response.status === 200) {
        return { newList, listName };
      } else throw new Error('Server error');
    })
    .catch((e) => {
      console.log(e);
      return { newList: user[listName], listName };
    });
});
