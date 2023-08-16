import offlineNews from '@constants/offlineNews';
import { IArticle } from '@models/News';
import { createSlice } from '@reduxjs/toolkit';
import { fetchNews } from '@reduxproj/api/news.api';

export const initialNewsState: {
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
  initialState: initialNewsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
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

export const newsReducer = newsSlice.reducer;
