import { configureStore } from '@reduxjs/toolkit/dist';
import authSlice from './auth/authSlice';
import commentSlice from './comment/commentSlice';
import postSlice from './post/postSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    comment: commentSlice,
  }
})
