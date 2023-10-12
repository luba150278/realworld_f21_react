import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: [],
  articlesCount: 0,
  id: 0,
  limit: 4,
  offset: 0,
  slug: "",
};

export const postsSlice = createSlice({
  name: "posts",
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
    changePagination: (state, action) => {
      const page = action.payload;
      state.offset = state.limit * (page - 1);
    },
    setPostSlug: (state, action) => {
      state.slug = action.payload;
    },
    clearPostSlug: (state) => {
      state.slug = "";
    },
  },
});

export const {
  setArticles,
  createArticle,
  changePagination,
  setPostSlug,
  clearPostSlug,
} = postsSlice.actions;
export default postsSlice.reducer;
