import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import "./ChatMain.scss";
import { IoMdSend } from "react-icons/io";
import user_img from "../../assets/images/Cha2.jpg";
import { BsEmojiSmileFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { AttachFile, Call, VideoCall } from "@material-ui/icons";
import { io } from "socket.io-client";
import LoadingSpinner from "../NormalSlider/LoadingSpinner";

import {
  selectChatMainData,
  update,
} from "./../../features/chatMain/chatMainSlice";

var socket;

const ChatMain = (props) => {
  //disabling the serializable check
  const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false,
  });
  //redux
  const chatMainData = useSelector(selectChatMainData);
  const dispatch = useDispatch();
  //browser
  const sender = localStorage.getItem("username");
  //react hooks
  const [isLoading, setLoading] = useState(true);
  const [finalData, setFinalData] = useState(chatMainData);
  const [room, setRoom] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    socket = io("http://localhost:8080");
    socket.emit("online", sender);
    setFinalData(chatMainData);

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
      socket.emit("offline", username1);
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

  useEffect(() => {
    const status = onlineUsers.includes(finalData.receiver)
      ? "online"
      : "offline";
    setFinalData((data) => {
      return {
        ...data,
        status: status,
      };
    });
  }, [onlineUsers]);

  useEffect(() => {
    socket.on("onJoin", (users) => {
      // console.log(onlineUsers);
      // console.log("onJoin all users");
      // console.log(users);
      setOnlineUsers(users);
    });
    socket.on("newUserJoined", (user) => {
      setOnlineUsers((users) => {
        if (sender === user) {
          return users;
        } else {
          return [...users, user];
        }
      });
    });
    socket.on("userLeft", (username) => {
      setOnlineUsers((users) => {
        if (users.includes(username) && sender !== username) {
          return users.filter((user) => user !== username);
        } else {
          return users;
        }
      });
    });
    socket.on("message", (msg) => {
      setFinalData((data) => {
        return {
          ...data,
          chatData: [...data.chatData, msg],
        };
      });
      dispatch(
        update({
          ...finalData,
          chatData: [...finalData.chatData, msg],
        })
      );
    });
    // socket.on("msgWithoutRoom", ({ room, message }) => {

    // });
    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      e.returnValue = "";
      socket.emit("offline", sender);
    });
    return () => {
      window.removeEventListener("beforeunload", function (e) {
        socket.emit("offline", sender);
      });
    };
  });
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
    dispatch(
      update({
        ...finalData,
        chatData: [...finalData.chatData, message],
      })
    );
    const receiver = localStorage.getItem("receiver");
    socket.emit("sendMessage", { room, message, receiver }, (error) => {
      if (error) {
        alert(error);
      }
    });
    socket.emit("getOnlineUsers", sender);
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
        {finalData.chatData.map((chatData) => {
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
            <div className={classForSendOrReciever} key={chatData.room}>
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
