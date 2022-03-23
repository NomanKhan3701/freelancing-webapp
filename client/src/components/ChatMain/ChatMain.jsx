import React, { useState } from "react";
import "./ChatMain.scss";
import robot from "../../assets/videos/robot.gif";
import { IoMdSend } from "react-icons/io";
import user_img from '../../assets/images/Cha2.jpg';
import { BsEmojiSmileFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { AttachFile, Call, VideoCall } from "@material-ui/icons";

const ChatMain = () => {
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
            <Call/>
          </div>
          <div className="video-call">
            <VideoCall/>
          </div>
        </div>
      </div>
      <div className="middle-container">
        <div className="message-container sended">
          <div className="msg">Hi 😊</div>
          {/* <div className="timestamp">08:45 am</div> */}
        </div>
        <div className="message-container recieved">
          <div className="msg ">Hello 😁</div>
          {/* <div className="timestamp">08:46 am</div> */}
        </div>
        <div className="message-container sended">
          <div className="msg">
            Do you have a template or any specification you require for your
            project ?
          </div>
          {/* <div className="timestamp">08:47 am</div> */}
        </div>
        <div className="message-container sended">
          <div className="msg">Like some specific type of technology</div>
          {/* <div className="timestamp">08:47 am</div> */}
        </div>
        <div className="message-container recieved">
          <div className="msg">
            No, you can use whatever you want just give me a desired result as
            per my description provided in the bid 👌👍
          </div>
          {/* <div className="timestamp">08:48 am</div> */}
        </div>
        <div className="message-container sended">
          <div className="msg ">Oh nice</div>
          {/* <div className="timestamp">08:49 am</div> */}
        </div>
        <div className="message-container recieved">
          <div className="msg">
            By the way, I have seen your profile, its quite good man
          </div>
          {/* <div className="timestamp">08:49 am</div> */}
        </div>
        <div className="message-container recieved">
          <div className="msg">How have you achieved so much</div>
          {/* <div className="timestamp">08:49 am</div> */}
        </div>
        <div className="message-container recieved">
          <div className="msg">Any tips from a god like yourself 😅😭</div>
          {/* <div className="timestamp">08:49 am</div> */}
        </div>
        <div className="message-container sended">
          <div className="msg">Just luck and hardwork 🤣😂</div>
          {/* <div className="timestamp">08:50 am</div> */}
        </div>
      </div>
      <div className="bottom-container">
        <div className="left-btn-container">
          <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
            {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
          </div>
          <div className="attach-file">
            <AttachFile/>
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
