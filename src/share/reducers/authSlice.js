import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: '',
  username: '',
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
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
});

function checkAuth() {
  if (localStorage.getItem('token')) {
    return {
      ...initialState,
      token: localStorage.getItem('token'),
      username: localStorage.getItem('username'),
    };
  }
  return initialState;
}
export const authSlice = createSlice({
  name: 'auth',
  initialState: checkAuth(),
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
        if (action.payload.user) {
          state.token = action.payload.user.token;
          state.username = action.payload.user.usernsme;
          localStorage.setItem('token', action.payload.user.token);
          localStorage.setItem('username', action.payload.user.username);
        }
        if (action.payload.errors) {
          state.error = action.payload.errors;
        }
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
export const { getToken } = authSlice.actions;
export default authSlice.reducer;
