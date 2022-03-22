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
    </div>
  );
};

export default Chat;
