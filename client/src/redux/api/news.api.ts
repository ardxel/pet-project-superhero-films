import NEWS_URL from '@constants/newsUrl';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNews = createAsyncThunk('news/fetchNews', async (nextPage = '', thunkAPI) => {
  const response = await axios.get(`${NEWS_URL}${nextPage}`);
  if (response.status === 200) {
    return await response.data;
  } else thunkAPI.rejectWithValue(response.data.status);
});
