import {  createSlice } from "@reduxjs/toolkit";


const initialState = {
  username: "",
  token: "",
};
function checkLocalStorage() {
  if (localStorage.getItem("token") && localStorage.getItem("username")) {
    return {
      ...initialState,
      token: localStorage.getItem("token") || "",
      username: localStorage.getItem("username") || "",
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

      const {username, token}= action.payload
      state.username = username;
      state.token = token;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
    },
    logout: (state) => {
      state.token = "";
      state.username = "";
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
  },
});

export const { logout, auth } = authSlice.actions;
export default authSlice.reducer;
