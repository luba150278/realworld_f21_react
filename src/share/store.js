import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/authSlice'
import postsSlice from './reducers/postsSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postsSlice
  },
})