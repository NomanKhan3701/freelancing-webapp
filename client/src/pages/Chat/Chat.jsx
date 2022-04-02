import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ChatMain,
  ChatMiddle,
  ChatSidebar,
  Navbar,
} from "../../components/import";
import "./Chat.scss";
import LoadingSpinner from "./LoadingSpinner";

const Chat = () => {
  const sender = localStorage.getItem("username");
  const [isLoading, setLoading] = useState(true);
  const [chats, setChats] = useState();
  const [chatData, setChatData] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/chat/:${sender}`)
      .then(function (response) {
        console.log(response.data);
        setChats(response.data.chats);
        setChatData(response.data.chatData);
        setLoading(false);
      });
  }, []);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="chat-container">
      <div className="chat">
        <ChatSidebar loggedIn="true" />
        <ChatMiddle chats={chats} chatData={chatData} />
        <ChatMain />
      </div>
    </div>
  );
};

export default Chat;
