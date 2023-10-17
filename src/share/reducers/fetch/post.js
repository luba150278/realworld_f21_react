import { clearError, setError } from "../errorSlice";
import { startLoading, stopLoading } from "../loaderSlice";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../api";
import { createArticle, setArticles } from "../postsSlice";

export const fetchDeletePost = createAsyncThunk(
  "posts/deletePost",
  async (slug, { dispatch }) => {
    try {

      dispatch(startLoading());
      await axios.delete(apiUrl + `/articles/${slug}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      });

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

export const fetchGetAllPosts = createAsyncThunk(
  "posts/getAll",
  async (_, { getState, dispatch }) => {
    try {
      const state = getState();
      const limit = state.posts.limit;
      const offset = state.posts.offset;
      dispatch(startLoading());
      const res = await axios.get(
        apiUrl + `/articles/?limit=${limit}&offset=${offset}`
      );

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

export const fetchPostsByTag = createAsyncThunk(
  "posts/getByTag",
  async (tag, { getState, dispatch }) => {
    try {
      const state = getState();
      const limit = state.posts.limit;
      const offset = state.posts.offset;
      dispatch(startLoading());
      const res = await axios.get(
        `${apiUrl}/articles/?limit=${limit}&offset=${offset}&tag=${tag}`
      );

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

export const fetchPostsByUser = createAsyncThunk(
  "posts/getByUser",
  async (id, { getState, dispatch }) => {
    try {
      const state = getState();
      const limit = state.posts.limit;
      const offset = state.posts.offset;
      dispatch(startLoading());
      const res = await axios.get(
        `${apiUrl}/articles/?limit=${limit}&offset=${offset}&authorId=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${localStorage.getItem("token")}`,
          },
        }
      );

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
  async (body, { dispatch }) => {
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

export const fetchEditPost = createAsyncThunk(
  "posts/editPost",
  async ({body, slug}, { dispatch }) => {
    try {
      dispatch(startLoading());

      const res = await axios.put(
        apiUrl + "/articles/"+slug ,
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


export const fetchPostComments = createAsyncThunk(
  "post/getComments",
  async (slug, { dispatch }) => {
    try {
      dispatch(startLoading());

      const res = await axios.get(
        apiUrl + "/articles/"+slug+"/comments" 
      );

       if(res.data.comments){
        dispatch(stopLoading());
         return res.data.comments
       }

      // dispatch(createArticle(res.data.article));
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

export const fetchAddComment = createAsyncThunk(
  "post/addComment",
  async ({slug, comment}, { dispatch }) => {
    try {
      dispatch(startLoading());
     console.log(slug)
      const res = await axios.post(
        apiUrl + "/articles/"+slug+"/comments", {
          "comment": {
            "body": comment
          }
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${localStorage.getItem("token")}`,
          },
        }  
      );

       if(res.data.comment){
        dispatch(stopLoading());
         return res.data.comment
       }

      // dispatch(createArticle(res.data.article));
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
