// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './path-to-your-auth-slice'; // Make sure to use the correct path to your `authSlice`

// Configure the store
const store = configureStore({
  reducer: {
    auth: authReducer, // Register the auth slice
  },
});

export default store;
