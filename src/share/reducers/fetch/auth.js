import { clearError, setError } from "../errorSlice";
import { startLoading, stopLoading } from "../loaderSlice";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../api";
import { auth } from "../authSlice";

export const fetchAuth = createAsyncThunk(
  "auth",
  async ({ body, path }, { dispatch }) => {
    try {
      dispatch(startLoading())
      const res = await axios.post(
        apiUrl + path,
        {
          user: { ...body },
        },
        { headers: { "Content-Type": "application/json" } }
      );

      dispatch(auth(res.data.user));
      dispatch(clearError());
      dispatch(stopLoading());
    } catch (error) {
      dispatch(stopLoading());
      if (error.response) {
        dispatch(setError(error.response.data));
        return;
      }

      dispatch(setError(error));
    }
  }
);
