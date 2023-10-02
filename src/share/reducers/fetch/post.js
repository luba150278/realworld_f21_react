import { clearError, setError } from "../errorSlice";
import { startLoading, stopLoading } from "../loaderSlice";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../api";
import { createArticle, setArticles } from "../postsSlice";


export const fetchGetAllPosts = createAsyncThunk(
  "posts/getAll",
  async (_, { dispatch }) => {
    try {
      dispatch(startLoading());
      const res = await axios.get(apiUrl + "/articles");
      console.log(res.data)
      dispatch(setArticles(res.data));
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

export const fetchCreatePost = createAsyncThunk(
  "posts/createPost",
  async ( body, { dispatch }) => {
    try {
      dispatch(startLoading());

      const res = await axios.post(
        apiUrl + "/articles",
        { article: { ...body } },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(createArticle(res.data.article));
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
