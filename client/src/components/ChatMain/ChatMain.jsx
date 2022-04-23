import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import "./ChatMain.scss";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { AttachFile, Call, VideoCall } from "@material-ui/icons";
import { FullDivLoader } from "../import";
import gif from "../../assets/images/talkingGif.gif";

import {
  selectChatMainData,
  update,
} from "./../../features/chatMain/chatMainSlice";
import { useNavigate } from "react-router";
import { selectRoom, setRoom } from "../../features/socket/roomSlice";
import { selectOnlineUsers } from "../../features/socket/onlineUsers";
import { selectSocket } from "../../features/socket/socketSlice";
import { selectNewMessage } from "../../features/socket/newMessage";

const ChatMain = (props) => {
  //disabling the serializable check
  const navigate = useNavigate();
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
  let room = useSelector(selectRoom);
  let onlineUsersObj = useSelector(selectOnlineUsers);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const socket = useSelector(selectSocket);
  const newMessage = useSelector(selectNewMessage);
  useEffect(() => {
    if (socket) {
      socket.on("getRoomNo", (room) => {
        dispatch(setRoom(room));
        localStorage.setItem("room", room);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (
      newMessage &&
      localStorage.getItem("receiver") === newMessage.username
    ) {
      dispatch(
        update({
          ...chatMainData,
          chatData: [...chatMainData.chatData, newMessage],
        })
      );
    }
  }, [newMessage]);

  useEffect(() => {
    const status = onlineUsersObj.includes(finalData.receiver)
      ? "online"
      : "offline";
    if (finalData.status !== status) {
      dispatch(update({ ...finalData, status: status }));
    }
  }, [onlineUsersObj]);

  useEffect(() => {
    if (chatMainData) {
      setLoading(false);
    }

    const status = onlineUsersObj.includes(chatMainData.receiver)
      ? "online"
      : "offline";
    setFinalData({ ...chatMainData, status: status });
    const chatContainer = document.querySelector(
      ".chat-main .middle-container"
    );
    if (chatContainer !== null) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatMainData]);

  if (isLoading) {
    return <FullDivLoader />;
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

  const goToVideoCall = (room) => {
    // window.location.assign(`/video/${room}`);
    navigate(`/video/${room}`, {
      state: {
        id: room,
      },
    });
  };
  return (
    <div className="chat-main">
      {finalData.receiver.toLowerCase() === "default" ||
      finalData.receiver.toLowerCase() === "undefined" ? (
        <div className="chat-default-section">
          <div className="robot-container">
            <div className="robot">
              <img src={gif} alt="" />
            </div>
            <div className="info">
              <div className="line">Chat with anyone you want to</div>
              <div className="line">Call anyone you need to</div>
              <div className="line">A totally lovely place for you</div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="top-container">
            <div className="user">
              <div className="user-img">
                <img src={finalData.receiverImage} alt="User" />
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
                <VideoCall
                  onClick={() => {
                    goToVideoCall(finalData.room);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="middle-container">
            {finalData.chatData.map((chatData, index) => {
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
                {showEmojiPicker && (
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                )}
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
        </>
      )}
    </div>
  );
};

export default ChatMain;
