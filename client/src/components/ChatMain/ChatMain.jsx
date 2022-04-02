import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import "./ChatMain.scss";
import robot from "../../assets/images/Robot.gif";
import { IoMdSend } from "react-icons/io";
import user_img from "../../assets/images/Cha2.jpg";
import { BsEmojiSmileFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { AttachFile, Call, VideoCall } from "@material-ui/icons";
import { io } from "socket.io-client";
import axios from "axios";
import LoadingSpinner from "../NormalSlider/LoadingSpinner";

import {
  update,
  selectChatMainData,
} from "./../../features/chatMain/chatMainSlice";

var socket = io("http://localhost:8080");

const ChatMain = () => {
  const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false,
  });
  const chatMainData = useSelector(selectChatMainData);
  const dispatch = useDispatch();
  console.log(chatMainData);
  const sender = localStorage.getItem("username");
  const [isLoading, setLoading] = useState(true);
  const [chatData, setChatData] = useState();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const username1 = "shreyash";
  const username2 = "noman";
  const ENDPOINT = "localhost:8080";
  // const [room, setRoom] = useState();
  const room = "shreyashnoman";

  const newChatMainDataFunction = (data, message) => {
    return {
      ...data,
      chatData: [...data.chatData, message],
    };
  };
  useEffect(() => {
    if (chatMainData) {
      setLoading(false);
    }
  });

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8080/chat/:${sender}`)
  //     .then(function (response) {
  //       if (chatData === undefined) {
  //         setChatData(response.data);
  //       }
  //       setLoading(false);
  //     });
  // }, []);
  useEffect(() => {
    socket.emit("join", { username1, username2 }, (error) => {
      if (error) {
        alert(error);
      }
    });
    return () => {
      socket.disconnect(); //socket.emit("disconnect") gives error as sdisconnect is reserved word
      socket.off();
    };
  }, [ENDPOINT]);
  useEffect(() => {
    socket.on("message", (message) => {});
    const message = {
      username: sender,
      message: msg,
      time: new Date(),
    };

    dispatch(update(newChatMainDataFunction(chatMainData, message)));
  }, []);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // socket.emit("getRoomNo", { username1, username2 }, (error) => {
  //   if (error) {
  //     alert(error);
  //   }
  // });
  //below caused infinite loop thing in backend
  // socket.on("getRoomNo", (rooom) => {
  //   setRoom(rooom);
  //   socket.emit("sendMessage", { room, message }, (error) => {
  //     if (error) {
  //       alert(error);
  //     }
  //   });
  // });

  // socket.emit("sendMessage", { room, message }, (error) => {
  //   if (error) {
  //     alert(error);
  //   }
  // });

  // const message = "shreyashdhamane is meesage";
  const handleSendMsg = (msg) => {
    const message = {
      username: sender,
      message: msg,
      time: new Date(),
    };

    dispatch(update(newChatMainDataFunction(chatMainData, message)));
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
      {/* <div className="robot-container">
        <img src={robot} alt="robot-waving" />
      </div> */}

      <div className="top-container">
        <div className="user">
          <div className="user-img">
            <img src={user_img} alt="User image" />
          </div>
          <div className="user-info">
            <div className="user-name">{chatMainData.receiver}</div>
            <div className="user-status">{chatMainData.status}</div>
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
