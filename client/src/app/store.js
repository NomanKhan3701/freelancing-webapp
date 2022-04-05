import { configureStore } from "@reduxjs/toolkit";
import chatMainReducer from "../features/chatMain/chatMainSlice";
export default configureStore({
  reducer: {
    chatMainData: chatMainReducer,
  },
});
