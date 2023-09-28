import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: '',
  loading: false,
  error: {},
};
export const fetchAuth = createAsyncThunk('auth/register', async (body) => {
  try {
    const res = await axios.post(
      process.env.REACT_APP_API_URL + '/users',
      {
        user: { ...body },
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return res.data;
  } catch (error) {
    throw error;
  }
});
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getToken: (state) => {
      return { ...state, token: '123' };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.user.token;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.loading = false;
        // state.token='';
        state.error = action.payload;
      });
  },
});
export const { getToken } = authSlice.actions;
export default authSlice.reducer;
