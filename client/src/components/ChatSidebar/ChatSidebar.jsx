import React from "react";
import "./ChatSidebar.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectSocket } from "../../features/socket/socketSlice";
import { setSocket } from "../../features/socket/socketSlice";
import { update } from "../../features/chatMain/chatMainSlice";
import bidAcceptedSlice, {
  setBidAccepted,
} from "../../features/socket/bidAcceptedSlice";
import { setNewBid } from "../../features/socket/newBidSlice";
import { setNewComment } from "../../features/socket/newCommentSlice";
import { setNewMessage } from "../../features/socket/newMessage";
import { setOnlineUsers } from "../../features/socket/onlineUsers";
import { setRoom } from "../../features/socket/roomSlice";
const ChatSidebar = (props) => {
  const socket = useSelector(selectSocket);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let image = localStorage.getItem("image");
  if (!image) {
    image = `https://ui-avatars.com/api/?name=${localStorage.getItem(
      "username"
    )}`;
  }
  const logout = () => {
    localStorage.setItem("loggedIn", "false");
    localStorage.setItem("isDataTaken", "false");
    localStorage.setItem("image", undefined);
    localStorage.setItem("room", undefined);
    socket.emit("offline", localStorage.getItem("username"));
    //order of setting matters
    localStorage.setItem("username", undefined);
    socket.disconnect(); //socket.emit("disconnect") gives error as sdisconnect is reserved word
    socket.off();
    dispatch(
      update({
        image: "default",
        receiver: "default",
        status: "default",
        room: "default",
        chatData: [],
      })
    );
    dispatch(setBidAccepted(null));
    dispatch(setNewBid(null));
    dispatch(setNewComment(null));
    dispatch(setNewMessage(null));
    dispatch(setOnlineUsers([]));
    dispatch(setRoom(null));
    dispatch(setSocket(null));
    navigate("/");
  };
  return (
    <div className="chat-sidebar">
      <div className="profile-picture">
        <img src={image} alt="" />
      </div>
      <div className="sidebar-links">
        <div className="top-links">
          <div className="link">
            <Link to="/">
              <i className="bx bxs-home"></i>
            </Link>
          </div>
          <div className="link">
            <a href="">
              <i className="bx bxs-message-rounded-dots"></i>
            </a>
          </div>
          <div className="link">
            <a href="">
              <i className="bx bxs-group"></i>
            </a>
          </div>
        </div>
        <div className="bottom-links">
          {props.loggedIn ? (
            <div className="link">
              <a href="" onClick={logout}>
                <i className="bx bx-log-out"></i>
              </a>
            </div>
          ) : (
            <div className="link">
              <a href="">
                <i className="bx bx-log-in"></i>
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="sidebar-menu-links"></div>
    </div>
  );
};

export default ChatSidebar;
