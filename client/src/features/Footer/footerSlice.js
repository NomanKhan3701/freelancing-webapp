import { createSlice } from "@reduxjs/toolkit";

export const footerSlice = createSlice({
  name: "footerData",
  initialState: {
    value: {
      registeredUsers: null,
      jobsPosted: null,
      phoneNumber: "+91 8879962673",
      url: "Freelance.com",
      gmail: "freelance@gmail.com",
      address:
        "Bhavans Campus, Old D N Nagar, Munshi Nagar, Andheri West, Mumbai,Maharashtra 400058",
    },
  },
  reducers: {
    setFooterData: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFooterData } = footerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectFooterData = (state) => state.footerData.value;

export default footerSlice.reducer;
