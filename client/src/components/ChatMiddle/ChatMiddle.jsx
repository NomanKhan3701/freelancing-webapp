import React, { useState, useEffect } from "react";
import "./ChatMiddle.scss";
import { Dehaze, Search } from "@material-ui/icons";
import peopleImg1 from "../../assets/images/Cha2.jpg";
import peopleImg2 from "../../assets/images/userImage.jpg";

import { useSelector, useDispatch } from "react-redux";
import {
  update,
  selectChatMainData,
} from "./../../features/chatMain/chatMainSlice";

const ChatMiddle = (props) => {
  const chatMainData = useSelector((state) => state.chatMainData.value);
  const dispatch = useDispatch();

  const sender = localStorage.getItem("username");
  const chats = props.chats;
  const chatData = props.chatData;

  const getLastMsg = (room) => {
    for (let i = 0; i < chatData.length; i++) {
      if (chatData[i].room === room) {
        return chatData[i].data[chatData[i].data.length - 1];
      }
    }
  };

  const changeChatMain = (room) => {
    let chatDataForUser, chatForUser;
    for (let i = 0; i < chats.length; i++) {
      if (chats[i].usernames === room) {
        chatForUser = chats[i];
        break;
      }
    }
    for (let i = 0; i < chatData.length; i++) {
      if (chatData[i].room === room) {
        chatDataForUser = chatData[i];
        break;
      }
    }
    const receiver =
      sender === chatForUser.username1
        ? chatForUser.username2
        : chatForUser.username1;
    dispatch(
      update({
        image: "not added yet",
        receiver: receiver,
        status: "not done",
        room: room,
        chatData: chatDataForUser.data,
      })
    );
  };


  return (
    <div className="chat-middle">
      <div className={`search-container`}>
        <input type="text" placeholder="Search here..." />
        <Search className="i" />
      </div>
      <div className="people-container">
        {chats.map((chat) => {
          const username1 = chat.username1;
          const username2 = chat.username2;
          const receiver = sender === username1 ? username2 : username1;
          const room = chat.usernames;
          const lastMsg = getLastMsg(room);
          const lstTimeOfMsg = new Date(lastMsg.time);
          const lastMsgTime =
            lstTimeOfMsg.getHours() + ":" + lstTimeOfMsg.getMinutes();
          return (
            <div
              className="person-wrapper"
              key={room}
              onClick={() => {
                changeChatMain(room);
              }}
            >
              <div className="person">
                <div className="person-img">
                  <img src={peopleImg1} alt="" />
                </div>
                <div className="person-mid">
                  <div className="person-name">{receiver}</div>
                  <div className="last-chat">{lastMsg.message}</div>
                </div>
                <div className="last-chat-time">{lastMsgTime}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatMiddle;
