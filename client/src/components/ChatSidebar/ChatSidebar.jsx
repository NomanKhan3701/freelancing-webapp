import React from "react";
import "./ChatSidebar.scss";
import user_image from "../../assets/images/Cha2.jpg";
import { Home } from "@material-ui/icons";

const ChatSidebar = () => {
  return (
    <div className="chat-sidebar">
      <div className="profile-picture">
        <img src={user_image} alt="" />
      </div>
      <div className="sidebar-links">
          <div className="link">
              <a href=""><Home/></a>
          </div>
      </div>
      <div className="sidebar-menu-links">
          
      </div>
    </div>
  );
};

export default ChatSidebar;
