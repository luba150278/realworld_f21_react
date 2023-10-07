import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/authSlice'
import postsSlice from './reducers/postsSlice'
import errorSlice from './reducers/errorSlice'
import loaderSlice from './reducers/loaderSlice'
import tagSlice from './reducers/tagSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postsSlice,
    errorState: errorSlice,
    loader: loaderSlice,
    tagSelect: tagSlice,
  },
})