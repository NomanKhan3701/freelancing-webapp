import { createSlice } from "@reduxjs/toolkit";

export const chatMainSlice = createSlice({
  name: "chatMainData",
  initialState: {
    value: {
      image: "default",
      receiver: "default",
      status: "default",
      room: "default",
      chatData: [],
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

// Action creators are generated for each case reducer function
export const { update } = chatMainSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectChatMainData = (state) => state.chatMainData.value;

export default chatMainSlice.reducer;
