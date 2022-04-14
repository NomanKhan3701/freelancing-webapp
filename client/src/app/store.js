import { configureStore } from "@reduxjs/toolkit";
import chatMainReducer from "../features/chatMain/chatMainSlice";
import imageReducer from "../features/images/imageSlice";
export default configureStore({
  reducer: {
    chatMainData: chatMainReducer,
    image: imageReducer,
  },
});
