import React, { useState, useEffect } from "react";
import "./ChatMiddle.scss";
import { Search } from "@material-ui/icons";
import { LimitCharHoverReveal } from "../import";
import { useSelector, useDispatch } from "react-redux";
import { update } from "./../../features/chatMain/chatMainSlice";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const ChatMiddle = (props) => {
  //dont remove below line of code,
  const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false,
  });
  const chatMainData = useSelector((state) => state.chatMainData.value);
  const dispatch = useDispatch();

  const sender = localStorage.getItem("username");

  const [chats, setChats] = useState(props.chats);
  const [chatData, setChatData] = useState(props.chatData);
  const getLastMsg = (room) => {
    for (let i = 0; i < chatData.length; i++) {
      if (chatData[i].room === room) {
        return chatData[i].data[chatData[i].data.length - 1];
      }
    }
  };

  useEffect(() => {
    setChatData((pData) => {
      for (let i = 0; i < pData.length; i++) {
        if (
          pData[i].room === chatMainData.room &&
          pData[i].data.length !== chatMainData.chatData.length
        ) {
          pData[i].data = chatMainData.chatData;
          let element = document.querySelector(`[id='${chatMainData.room}']`);
          element = element.getElementsByClassName("last-chat")[0];
          element.textContent = chatMainData.chatData.slice(-1)[0].message;
          if (element.textContent.length > 15) {
            element.textContent = element.textContent.substring(0, 15) + "...";
          }
          break;
        }
      }
      return pData;
    });
  }, [chatMainData]);

  const changeChatMain = (room, receiverImage) => {
    if (chatMainData.room === room) {
      return;
    }
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
    if (!chatDataForUser) {
      chatDataForUser = { data: [] };
    }
    const receiver =
      sender === chatForUser.username1
        ? chatForUser.username2
        : chatForUser.username1;
    localStorage.setItem("receiver", receiver);
    dispatch(
      update({
        image: "not added yet",
        receiver: receiver,
        receiverImage: receiverImage,
        status: "offline",
        room: room,
        chatData: chatDataForUser.data,
      })
    );
  };

  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setChats(() => {
      return props.chats.filter((chat) => {
        const receiver =
          sender === chat.username1 ? chat.username2 : chat.username1;
        if (receiver.toLowerCase().includes(value.toLowerCase())) {
          return chat;
        }
      });
    });
  };

  return (
    <div className="chat-middle">
      <div className={`search-container`}>
        <input
          type="text"
          placeholder="Search here..."
          value={searchInput}
          onChange={handleSearch}
        />
        <Search className="i" />
      </div>
      <div className="people-container">
        {chats.map((chat) => {
          const username1 = chat.username1;
          const username2 = chat.username2;
          const receiver = sender === username1 ? username2 : username1;
          const room = chat.usernames;
          let lastMsg;
          let lstTimeOfMsg;
          let lastMsgTime;
          let lastttMessage;
          let receiverImage = sender === username1 ? chat.image2 : chat.image1;
          if (!receiverImage) {
            receiverImage = `https://ui-avatars.com/api/?name=${receiver}`;
          }
          try {
            lastMsg = getLastMsg(room);

            lstTimeOfMsg = new Date(lastMsg.time);
            lastMsgTime =
              String(lstTimeOfMsg.getHours()).padStart(2, "0") + ":" + String(lstTimeOfMsg.getMinutes()).padStart(2, "0");
            lastttMessage = lastMsg.message;
            if (lastttMessage.length > 15) {
              lastttMessage = lastttMessage.substring(0, 15) + "...";
            }
          } catch (error) {
            lastttMessage = "Start The Conversation...";
            lstTimeOfMsg = "";
            lastMsgTime = "";
          }
          if (!lastttMessage) {
            lastttMessage = "Start The Conversation...";
          }

          return (
            <div
              className="person-wrapper"
              key={room}
              id={room}
              onClick={() => {
                setSearchInput("");
                setChats(props.chats);
                changeChatMain(room, receiverImage);
              }}
            >
              <div className="person">
                <div className="person-img">
                  <img src={receiverImage} alt="" />
                </div>
                <div className="person-mid">
                  <div className="person-name">
                    <LimitCharHoverReveal word={receiver} limit="15"/>
                  </div>
                  <div className="last-chat">{lastttMessage}</div>
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
