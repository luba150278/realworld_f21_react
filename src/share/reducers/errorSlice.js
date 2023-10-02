import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
};
export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload.errors || action.payload.message || null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {setError, clearError} = errorSlice.actions

export default errorSlice.reducer;