import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import NEWS_URL from '@constants/newsUrl';

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (nextPage: string, thunkAPI) => {
    try {
      const response = await axios.get(`${NEWS_URL}&page=${nextPage}`)
      return await response.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e);
    }
  }
)