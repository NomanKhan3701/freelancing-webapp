import { createSlice } from "@reduxjs/toolkit";

export const newMessageSlice = createSlice({
  name: "newMessage",
  initialState: {
    value: undefined,
  },
  reducers: {
    setNewMessage: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNewMessage } = newMessageSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectNewMessage = (state) => state.newMessage.value;

export default newMessageSlice.reducer;
