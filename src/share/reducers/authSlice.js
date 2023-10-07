import {  createSlice } from "@reduxjs/toolkit";


const initialState = {
  username: "",
  token: "",
  id: 0,
};
function checkLocalStorage() {
  if (localStorage.getItem("token") && localStorage.getItem("username")) {
    return {
      ...initialState,
      token: localStorage.getItem("token") || "",
      username: localStorage.getItem("username") || "",
      id: Number(localStorage.getItem("id")) || 0,
    };
  } else {
    return initialState;
  }
}

export const authSlice = createSlice({
  name: "auth",
  initialState: checkLocalStorage(),
  reducers: {
    auth: (state, action) => {

      const {username, token, id}= action.payload
      state.username = username;
      state.token = token;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("id", id);
    },
    logout: (state) => {
      state.token = "";
      state.username = "";
      state.id = 0;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("id");
    },
  },
});

export const { logout, auth } = authSlice.actions;
export default authSlice.reducer;
