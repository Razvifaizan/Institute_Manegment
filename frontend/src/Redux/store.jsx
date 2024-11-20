import { configureStore } from "@reduxjs/toolkit";
import userCartReducer from './Slice'; // Correct import path for your Slice

export const store = configureStore({
   reducer: {
      userCart: userCartReducer // Register the userCart reducer in the store
   }
});
