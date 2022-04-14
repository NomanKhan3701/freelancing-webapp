import { createSlice } from "@reduxjs/toolkit";

export const imageSlice = createSlice({
  name: "image",
  initialState: {
    value: {
      image: "",
    },
  },
  reducers: {
    update: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload;
    },
  },
});

export const { update } = imageSlice.actions;
// Action creators are generated for each case reducer function
export const selectImageData = (state) => state.image.value;
export default imageSlice.reducer;
