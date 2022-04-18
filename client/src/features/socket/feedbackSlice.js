import { createSlice } from "@reduxjs/toolkit";

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    value: undefined,
  },
  reducers: {
    setFeedback: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFeedback } = feedbackSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectFeedback = (state) => state.feedback.value;

export default feedbackSlice.reducer;
