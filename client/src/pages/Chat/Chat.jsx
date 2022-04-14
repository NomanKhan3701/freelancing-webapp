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
import { useSelector, useDispatch } from "react-redux";
import {
  update,
  selectChatMainData,
} from "./../../features/chatMain/chatMainSlice";
import { useLocation } from "react-router";
import { selectImageData } from "../../features/images/imageSlice";

const Chat = () => {
  const chatMainData = useSelector(selectImageData);
  const dispatch = useDispatch();
  const sender = localStorage.getItem("username");
  const [isLoading, setLoading] = useState(true);
  const [chats, setChats] = useState();
  const [chatData, setChatData] = useState();
  const { state } = useLocation();
  let receiver;
  try {
    receiver = state.receiver;
  } catch (error) {
    receiver = "";
  }
  useEffect(() => {
    let url = `http://localhost:8080/chat/${sender}`;
    if (receiver) {
      url += `/${receiver}`;
    }
    axios.get(url).then(function (response) {
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
