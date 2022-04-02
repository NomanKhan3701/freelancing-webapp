import React, { useState, useEffect } from "react";
import "./ChatMiddle.scss";
import { Dehaze, Search } from "@material-ui/icons";
import peopleImg1 from "../../assets/images/Cha2.jpg";
import peopleImg2 from "../../assets/images/userImage.jpg";

const ChatMiddle = () => {
  return (
    <div className="chat-middle">
      <div className={`search-container`}>
        <input type="text" placeholder="Search here..." />
        <Search className="i" />
      </div>
      <div className="people-container">
        <div className="person-wrserverer">
          <div className="person">
            <div className="person-img">
              <img src={peopleImg1} alt="" />
            </div>
            <div className="person-mid">
              <div className="person-name">Cha Eun Woo</div>
              <div className="last-chat">Your biggest Fann 😍</div>
            </div>
            <div className="last-chat-time">09:00pm</div>
          </div>
        </div>
        <div className="person-wrserverer">
          <div className="person">
            <div className="person-img">
              <img src={peopleImg1} alt="" />
            </div>
            <div className="person-mid">
              <div className="person-name">Cha Eun Woo</div>
              <div className="last-chat">Your biggest Fann 😍</div>
            </div>
            <div className="last-chat-time">09:00pm</div>
          </div>
        </div>
        <div className="person-wrserverer">
          <div className="person">
            <div className="person-img">
              <img src={peopleImg1} alt="" />
            </div>
            <div className="person-mid">
              <div className="person-name">Cha Eun Woo</div>
              <div className="last-chat">Your biggest Fann 😍</div>
            </div>
            <div className="last-chat-time">09:00pm</div>
          </div>
        </div>
        <div className="person-wrserverer">
          <div className="person">
            <div className="person-img">
              <img src={peopleImg1} alt="" />
            </div>
            <div className="person-mid">
              <div className="person-name">Cha Eun Woo</div>
              <div className="last-chat">Your biggest Fann 😍</div>
            </div>
            <div className="last-chat-time">09:00pm</div>
          </div>
        </div>
        <div className="person-wrserverer">
          <div className="person">
            <div className="person-img">
              <img src={peopleImg1} alt="" />
            </div>
            <div className="person-mid">
              <div className="person-name">Cha Eun Woo</div>
              <div className="last-chat">Your biggest Fann 😍</div>
            </div>
            <div className="last-chat-time">09:00pm</div>
          </div>
        </div>
        <div className="person-wrserverer">
          <div className="person">
            <div className="person-img">
              <img src={peopleImg1} alt="" />
            </div>
            <div className="person-mid">
              <div className="person-name">Cha Eun Woo</div>
              <div className="last-chat">Your biggest Fann 😍</div>
            </div>
            <div className="last-chat-time">09:00pm</div>
          </div>
        </div>
        <div className="person-wrserverer">
          <div className="person">
            <div className="person-img">
              <img src={peopleImg1} alt="" />
            </div>
            <div className="person-mid">
              <div className="person-name">Cha Eun Woo</div>
              <div className="last-chat">Your biggest Fann 😍</div>
            </div>
            <div className="last-chat-time">09:00pm</div>
          </div>
        </div>
        <div className="person-wrserverer">
          <div className="person">
            <div className="person-img">
              <img src={peopleImg1} alt="" />
            </div>
            <div className="person-mid">
              <div className="person-name">Cha Eun Woo</div>
              <div className="last-chat">Your biggest Fann 😍</div>
            </div>
            <div className="last-chat-time">09:00pm</div>
          </div>
        </div>
        <div className="person-wrserverer">
          <div className="person">
            <div className="person-img">
              <img src={peopleImg1} alt="" />
            </div>
            <div className="person-mid">
              <div className="person-name">Cha Eun Woo</div>
              <div className="last-chat">Your biggest Fann 😍</div>
            </div>
            <div className="last-chat-time">09:00pm</div>
          </div>
        </div>
        <div className="person-wrserverer">
          <div className="person">
            <div className="person-img">
              <img src={peopleImg1} alt="" />
            </div>
            <div className="person-mid">
              <div className="person-name">Cha Eun Woo</div>
              <div className="last-chat">Your biggest Fann 😍</div>
            </div>
            <div className="last-chat-time">09:00pm</div>
          </div>
        </div>
        <div className="person-wrserverer">
          <div className="person">
            <div className="person-img">
              <img src={peopleImg1} alt="" />
            </div>
            <div className="person-mid">
              <div className="person-name">Cha Eun Woo</div>
              <div className="last-chat">Your biggest Fann 😍</div>
            </div>
            <div className="last-chat-time">09:00pm</div>
          </div>
        </div>
        <div className="person-wrserverer">
          <div className="person">
            <div className="person-img">
              <img src={peopleImg1} alt="" />
            </div>
            <div className="person-mid">
              <div className="person-name">Cha Eun Woo</div>
              <div className="last-chat">Your biggest Fann 😍</div>
            </div>
            <div className="last-chat-time">09:00pm</div>
          </div>
        </div>
        <div className="person-wrserverer">
          <div className="person">
            <div className="person-img">
              <img src={peopleImg1} alt="" />
            </div>
            <div className="person-mid">
              <div className="person-name">Cha Eun Woo</div>
              <div className="last-chat">Your biggest Fann 😍</div>
            </div>
            <div className="last-chat-time">09:00pm</div>
          </div>
        </div>
        <div className="person-wrserverer">
          <div className="person">
            <div className="person-img">
              <img src={peopleImg1} alt="" />
            </div>
            <div className="person-mid">
              <div className="person-name">Cha Eun Woo</div>
              <div className="last-chat">Your biggest Fann 😍</div>
            </div>
            <div className="last-chat-time">09:00pm</div>
          </div>
        </div>
        <div className="person-wrserverer">
          <div className="person">
            <div className="person-img">
              <img src={peopleImg1} alt="" />
            </div>
            <div className="person-mid">
              <div className="person-name">Cha Eun Woo</div>
              <div className="last-chat">Your biggest Fann 😍</div>
            </div>
            <div className="last-chat-time">09:00pm</div>
          </div>
        </div>
        <div className="person-wrserverer">
          <div className="person">
            <div className="person-img">
              <img src={peopleImg1} alt="" />
            </div>
            <div className="person-mid">
              <div className="person-name">Cha Eun Woo</div>
              <div className="last-chat">Your biggest Fann 😍</div>
            </div>
            <div className="last-chat-time">09:00pm</div>
          </div>
        </div>
        <div className="person-wrserverer">
          <div className="person">
            <div className="person-img">
              <img src={peopleImg1} alt="" />
            </div>
            <div className="person-mid">
              <div className="person-name">Cha Eun Woo</div>
              <div className="last-chat">Your biggest Fann 😍</div>
            </div>
            <div className="last-chat-time">09:00pm</div>
          </div>
        </div>
        <div className="person-wrserverer">
          <div className="person">
            <div className="person-img">
              <img src={peopleImg1} alt="" />
            </div>
            <div className="person-mid">
              <div className="person-name">Cha Eun Woo</div>
              <div className="last-chat">Your biggest Fann 😍</div>
            </div>
            <div className="last-chat-time">09:00pm</div>
          </div>
        </div>
        <div className="person-wrserverer">
          <div className="person">
            <div className="person-img">
              <img src={peopleImg1} alt="" />
            </div>
            <div className="person-mid">
              <div className="person-name">Cha Eun Woo</div>
              <div className="last-chat">Your biggest Fann 😍</div>
            </div>
            <div className="last-chat-time">09:00pm</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMiddle;
