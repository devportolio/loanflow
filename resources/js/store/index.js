import { configureStore } from '@reduxjs/toolkit';
import auth from '../store/authSlice';
import friend from '../store/friendSlice'
import loan from '../store/loanSlice'

export default configureStore({
  reducer: { auth, friend, loan },
})