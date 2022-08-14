import { configureStore } from '@reduxjs/toolkit/dist';
import authSlice from './auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice
  }
})
