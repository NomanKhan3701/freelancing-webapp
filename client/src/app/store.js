import { configureStore } from "@reduxjs/toolkit";
import chatMainReducer from "../features/chatMain/chatMainSlice";
export default configureStore({
  reducer: {
    chatMainData: chatMainReducer,
  },
  //non-serialiazable issue in dispatch() so had to do this
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
