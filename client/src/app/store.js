import { configureStore } from "@reduxjs/toolkit";
import chatMainReducer from "../features/chatMain/chatMainSlice";
import findTalentDataReducer from "../features/findTalent/findTalentSlice";
export default configureStore({
  reducer: {
    chatMainData: chatMainReducer,
    findTalentData: findTalentDataReducer,
  },
});
