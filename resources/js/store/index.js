import { configureStore } from '@reduxjs/toolkit';
import auth from '../store/authSlice';

export default configureStore({
  reducer: { auth },
})