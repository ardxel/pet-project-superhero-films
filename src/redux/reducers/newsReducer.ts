import { createSlice } from '@reduxjs/toolkit';
import { fetchNews } from 'redux/actions/fetchNews';
import { IArticle } from 'types/News';
import offlineNews from '@constants/offlineNews';

const initialState: {
  isLoading: boolean;
  data: IArticle[];
  error: boolean;
  nextPage: string | null;
} = {
  isLoading: false,
  data: [] as IArticle[],
  error: false,
  nextPage: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState: initialState,
  reducers: {},
  extraReducers: (bulder) => {
    bulder
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        console.log('fulfilled!');
        state.isLoading = false;
        if (action.payload.nextPage) {
          state.nextPage = '&page=' + action.payload!.nextPage;
        }
        state.data.push(...action.payload!.results);
      })
      .addCase(fetchNews.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
        state.data = offlineNews;
      });
  },
});

export default newsSlice;
