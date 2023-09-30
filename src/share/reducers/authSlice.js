import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../api';

const initialState = {
  username: '',
  token: '',
  loading: false,
  error: {},
};
function checkLocalStorage() {
  if (localStorage.getItem('token') && localStorage.getItem('username')) {
    return {
      ...initialState,
      token: localStorage.getItem('token') || '',
      username: localStorage.getItem('username') || '',
    };
  } else {
    return initialState;
  }
}
export const fetchAuth = createAsyncThunk('auth/register', async (body) => {
  try {
    const res = await axios.post(
      apiUrl + '/users',
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

export const fetchLogin = createAsyncThunk('auth/login', async (body) => {
  try {
    const res = await axios.post(
      apiUrl + '/users/login',
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
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = '';
      state.username = '';
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogin.pending, (state) => {
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;
