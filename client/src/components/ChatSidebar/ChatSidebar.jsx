import React from "react";
import "./ChatSidebar.scss";
import user_image from "../../assets/images/Cha2.jpg";
import { Home } from "@material-ui/icons";

const ChatSidebar = (props) => {
  return (
    <div className = "chat-sidebar">
      <div className = "profile-picture">
        <img src = {user_image} alt="" />
      </div>
      <div className = "sidebar-links">
        <div className = "top-links">
          <div className = "link">
            <a href = "">
              <i class = "bx bxs-home"></i>
            </a>
          </div>
          <div className = "link">
            <a href = "">
              <i class = "bx bxs-message-rounded-dots"></i>
            </a>
          </div>
          <div className = "link">
            <a href = "">
              <i class = "bx bxs-group"></i>
            </a>
          </div>
        </div>
        <div className = "bottom-links">
          {props.loggedIn ? (
            <div className = "link">
              <a href = "">
                <i class = "bx bx-log-out"></i>
              </a>
            </div>
          ) : (
            <div className = "link">
              <a href = "">
                <i class = "bx bx-log-in"></i>
              </a>
            </div>
          )}
        </div>
      </div>
      <div className = "sidebar-menu-links"></div>
    </div>
  );
};

export default ChatSidebar;
