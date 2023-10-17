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
      dispatch(startLoading());
      const res = await axios.post(
        apiUrl + path,
        {
          user: { ...body },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
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

export const fetchCurrentUser = createAsyncThunk(
  "current",
  async (_, { dispatch }) => {
    try {
      dispatch(startLoading());
      const res = await axios.get(apiUrl + "/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.user) {
        dispatch(stopLoading());
        return res.data.user;
      }

      // dispatch(auth(res.data.user));
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

export const fetchEditUser = createAsyncThunk(
  "editUser",
  async (body, { dispatch }) => {
    try {
      dispatch(startLoading());
      const res = await axios.put(
        apiUrl + "/user",
        {
          user: { ...body },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${localStorage.getItem("token")}`,
          },
        }
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
