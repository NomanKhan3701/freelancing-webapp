import React, { useState, useEffect } from "react";
import "./ChatMain.scss";
import robot from "../../assets/videos/robot.gif";
import { IoMdSend } from "react-icons/io";
import user_img from "../../assets/images/Cha2.jpg";
import { BsEmojiSmileFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { AttachFile, Call, VideoCall } from "@material-ui/icons";
import { io } from "socket.io-client";

var socket = io("http://localhost:8080");

const ChatMain = () => {
  const username1 = "shreyash";
  const username2 = "noman";
  const ENDPOINT = "localhost:8080";
  // const [room, setRoom] = useState();
  const room = "shreyashnoman";
  const message = {
    username: "shreyash",
    message: "this is a message",
    time: new Date(),
  };
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
  socket.emit("getRoomNo", { username1, username2 }, (error) => {
    if (error) {
      alert(error);
    }
  });
  //below caused infinite loop thing in backend
  // socket.on("getRoomNo", (rooom) => {
  //   setRoom(rooom);
  //   socket.emit("sendMessage", { room, message }, (error) => {
  //     if (error) {
  //       alert(error);
  //     }
  //   });
  // });

  socket.emit("sendMessage", { room, message }, (error) => {
    if (error) {
      alert(error);
    }
  });

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("message is ");
      console.log(message.username);
      console.log(message.message);
      console.log(message.time);
    });
  }, []);
  // const message = "shreyashdhamane is meesage";
  const handleSendMsg = async (msg) => {
    alert(msg);
  };

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

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
  const sender = localStorage.getItem("username");
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
            <div className="user-name">Cha Eun Woo</div>
            <div className="user-status">Online</div>
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
      <div className="middle-container"></div>
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
