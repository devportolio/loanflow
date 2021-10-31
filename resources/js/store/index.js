import { configureStore } from '@reduxjs/toolkit';
import auth from '../store/authSlice';
import friend from '../store/friendSlice'

export default configureStore({
  reducer: { auth, friend },
})