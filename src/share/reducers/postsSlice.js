import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../api';

const initialState = {
  articles: [],
  articlesCount: 0,
  loading: false,
  error: {},
};

export const fetchGetAllPosts = createAsyncThunk('posts/getAll', async () => {
  try {
    const res = await axios.get(apiUrl + '/articles');

    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }

    throw error;
  }
});

export const fetchCreatePost = createAsyncThunk(
  'posts/getAll',
  async (body) => {
    try {
      const res = await axios.post(
        apiUrl + '/articles',
        { article: { ...body } },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${localStorage.getItem('token')}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }

      throw error;
    }
  }
);
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCreatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGetAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const { articles, articlesCount } = action.payload;
          state.articles = articles;
          state.articlesCount = articlesCount;
        }

        if (action.payload.errors) {
          state.error = action.payload.errors;
        }
      })

      .addCase(fetchCreatePost.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const { articles, articlesCount } = action.payload;
          state.articles = articles;
          state.articlesCount = articlesCount;
        }

        if (action.payload.errors) {
          state.error = action.payload.errors;
        }
      })
      .addCase(fetchGetAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchCreatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      ;
  },
});

export default postsSlice.reducer;
