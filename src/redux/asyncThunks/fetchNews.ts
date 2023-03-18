import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import NEWS_URL from '@constants/newsUrl';

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (nextPage: string = '', thunkAPI) => {
    const response = await axios.get(`${NEWS_URL}${nextPage}`);
    if (response.status === 200) {
      return await response.data;
    } else thunkAPI.rejectWithValue(response.data.status);
  }
);
