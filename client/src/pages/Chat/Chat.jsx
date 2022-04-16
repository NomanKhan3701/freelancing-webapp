import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChatMain, ChatMiddle, ChatSidebar } from "../../components/import";
import "./Chat.scss";
import LoadingSpinner from "./LoadingSpinner";

import { useLocation } from "react-router";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
toast.configure();

const Chat = () => {
  const navigate = useNavigate();
  const sender = localStorage.getItem("username");
  const [isLoading, setLoading] = useState(true);
  const [chats, setChats] = useState();
  const [chatData, setChatData] = useState();
  const { state } = useLocation();
  let image1 = localStorage.getItem("image");
  if (!image1) {
    image1 = `https://ui-avatars.com/api/?name=${sender}`;
  }
  let receiver, image2;

  try {
    receiver = state.receiver;
    image2 = state.image;
  } catch (error) {
    receiver = "";
  }
  useEffect(() => {
    let url = `http://localhost:8080/chat/${sender}`;
    if (receiver) {
      url += `/${receiver}`;
    }
    //using post instead of get was giving error xhtmlRequest like that,
    // axios.get(url).then((response) => {
    //   setChats(response.data.chats);
    //   setChatData(response.data.chatData);
    //   setLoading(false);
    // });
    axios
      .post(url, {
        image1: image1,
        image2: image2,
      })
      .then((response) => {
        setChats(response.data.chats);
        setChatData(response.data.chatData);
        setLoading(false);
      });
    const isDataTaken = localStorage.getItem("isDataTaken");
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "false") {
      toast.error("Please login to post.", {
        position: "top-center",
      });
      navigate("/login", {
        state: {
          goingTo: "/findtalent/postwork",
        },
      });
      return;
    }
    if (isDataTaken === "false") {
      toast.success("You must fill your details before posting the work.", {
        position: "top-center",
      });
      navigate("/userprofileinput");
    }
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
