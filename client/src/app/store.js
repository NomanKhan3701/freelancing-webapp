import { configureStore } from "@reduxjs/toolkit";
import chatMainReducer from "../features/chatMain/chatMainSlice";
import socketReducer from "../features/socket/socketSlice";
import roomReducer from "../features/socket/roomSlice";
import onlineUsersReducer from "../features/socket/onlineUsers";
import newMessageReducer from "../features/socket/newMessage";
import newBidReducer from "../features/socket/newBidSlice";
import newCommentReducer from "../features/socket/newCommentSlice";
import bidAcceptedReducer from "../features/socket/bidAcceptedSlice";
import footerReducer from "../features/Footer/footerSlice";

export default configureStore({
  reducer: {
    chatMainData: chatMainReducer,
    socket: socketReducer,
    room: roomReducer,
    onlineUsers: onlineUsersReducer,
    newMessage: newMessageReducer,
    newBid: newBidReducer,
    newComment: newCommentReducer,
    bidAccepted: bidAcceptedReducer,
    footerData: footerReducer,
  },
  //non-serialiazable issue in dispatch() so had to do this
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
