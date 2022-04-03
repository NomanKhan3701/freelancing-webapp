import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import "./ChatMain.scss";
import { IoMdSend } from "react-icons/io";
import user_img from "../../assets/images/Cha2.jpg";
import { BsEmojiSmileFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { AttachFile, Call, VideoCall } from "@material-ui/icons";
import { io } from "socket.io-client";
import LoadingSpinner from "../NormalSlider/LoadingSpinner";

import { selectChatMainData } from "./../../features/chatMain/chatMainSlice";

var socket;

const ChatMain = (props) => {
  //disabling the serializable check
  const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false,
  });
  //redux
  const chatMainData = useSelector(selectChatMainData);
  //browser
  const sender = localStorage.getItem("username");
  //react hooks
  const [isLoading, setLoading] = useState(true);
  const [finalData, setFinalData] = useState(chatMainData);
  const [room, setRoom] = useState();
  useEffect(() => {
    socket = io("http://localhost:8080");
    setFinalData(chatMainData);
    socket.on("message", (msg) => {
      setFinalData((data) => {
        return {
          ...data,
          chatData: [...data.chatData, msg],
        };
      });
    });
    socket.on("error", function (err) {
      console.log(err);
    });
    const username1 = localStorage.getItem("username");
    const username2 = localStorage.getItem("receiver");
    if (username1 && username2) {
      socket.emit("join", { username1, username2 }, (error) => {
        if (error) {
          alert(error);
        }
      });
    }
    socket.on("getRoomNo", (room) => {
      setRoom(room);
    });
    if (username2) {
      const chatContainer = document.querySelector(
        ".chat-main .middle-container"
      );
      if (chatContainer !== null) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
    return () => {
      socket.disconnect(); //socket.emit("disconnect") gives error as sdisconnect is reserved word
      socket.off();
    };
  }, [chatMainData]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (finalData) {
      setLoading(false);
    }
    const chatContainer = document.querySelector(
      ".chat-main .middle-container"
    );
    if (chatContainer !== null) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [finalData]);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleSendMsg = (msg) => {
    const message = {
      username: sender,
      message: msg,
      time: new Date(),
    };
    setFinalData((data) => {
      return {
        ...data,
        chatData: [...data.chatData, message],
      };
    });
    socket.emit("sendMessage", { room, message }, (error) => {
      if (error) {
        alert(error);
      }
    });
  };

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <div className="chat-main">
      <div className="top-container">
        <div className="user">
          <div className="user-img">
            <img src={user_img} alt="User image" />
          </div>
          <div className="user-info">
            <div className="user-name">{finalData.receiver}</div>
            <div className="user-status">{finalData.status}</div>
          </div>
        </div>
        <div className="top-menu">
          <div className="call">
            <Call />
          </div>
          <div className="video-call">
            <VideoCall />
          </div>
        </div>
      </div>
      <div className="middle-container">
        {chatMainData.chatData.map((chatData, index) => {
          let classForSendOrReciever =
            chatData.username === sender ? "sended" : "recieved";
          classForSendOrReciever =
            "message-container " + classForSendOrReciever;
          let time = new Date(chatData.time);
          time =
            String(time.getHours()).padStart(2, "0") +
            ":" +
            String(time.getMinutes()).padStart(2, "0");
          return (
            <div className={classForSendOrReciever} key={index}>
              <div className="msg">{chatData.message}</div>
              <div className="timestamp">{time}</div>
            </div>
          );
        })}
      </div>
      <div className="bottom-container">
        <div className="left-btn-container">
          <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
            {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
          </div>
          <div className="attach-file">
            <AttachFile />
          </div>
        </div>
        <form onSubmit={(e) => sendChat(e)} className="input-container">
          <div className="message-input">
            <input
              type="text"
              placeholder="Type your message here..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
          </div>
          <button className="submit">
            <IoMdSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatMain;
