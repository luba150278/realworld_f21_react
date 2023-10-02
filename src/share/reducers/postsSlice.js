import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articles: [],
  articlesCount: 0,
  id: 0,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setArticles: (state, action) => {
      const { articles, articlesCount } = action.payload;
      state.articles = articles;
      state.articlesCount = articlesCount;
    },
    createArticle: (state, action) => {
      state.id = action.payload.id;
    },
  },
});

export const { setArticles, createArticle } = postsSlice.actions;
export default postsSlice.reducer;
