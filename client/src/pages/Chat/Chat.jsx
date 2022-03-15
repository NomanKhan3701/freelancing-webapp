import React from "react";
import {
  ChatMain,
  ChatMiddle,
  ChatSidebar,
  Navbar,
} from "../../components/import";
import "./Chat.scss";

const Chat = () => {
  return (
    <div className="chat-container">
      <div className="chat">
        <ChatSidebar loggedIn="true"/>
        <ChatMiddle />
        <ChatMain />
      </div>
      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
      <div className="circle circle-3"></div>
      <div className="circle circle-4"></div>
    </div>
  );
};

export default Chat;
