import { createSlice } from "@reduxjs/toolkit";

export const newBidSlice = createSlice({
  name: "newBid",
  initialState: {
    value: undefined,
  },
  reducers: {
    setNewBid: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNewBid } = newBidSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectNewBid = (state) => state.newBid.value;

export default newBidSlice.reducer;
