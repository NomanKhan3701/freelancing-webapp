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
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
toast.configure();

const Chat = () => {
  // const chatMainData = useSelector(selectImageData);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
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
    if (!isDataTaken === "true") {
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
