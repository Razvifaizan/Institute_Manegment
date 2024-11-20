import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
   name: 'userCart',
   initialState: {
      value: {
         name: undefined,
         token: undefined,
         role: undefined,
         image: undefined,
         isLoginStatus: false
      }
   },
   reducers: {
      // Update all user information
      updateUser: (state, action) => {
         const data = action.payload;
         console.log("My Slice Data is: " + JSON.stringify(data));
         state.value = data;  // Update all fields with new user data
         console.log("My Slice Value is: " + JSON.stringify(state.value));
      },

      // Update only the user image
      updateProfileImage: (state, action) => {
         const newImage = action.payload;  // Payload contains the new image URL
         state.value.User_Icon = newImage;     // Update only the image field
         console.log("User image updated: " + newImage);
      }
   }
});

export const { updateUser, updateProfileImage } = slice.actions; // Export actions
export default slice.reducer; // Export reducer as default
