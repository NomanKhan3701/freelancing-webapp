import { Dehaze, Search } from "@material-ui/icons";
import { motion } from "framer-motion";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import React, { useState, useEffect } from "react";
import "./navbar.scss";
import userImage from "../../assets/images/userImage.jpg";
import { Dropdown } from "../import";
import { NavLink } from "react-router-dom";

const SearchAndLinks = (props) => {
  const navLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? "#349eff" : "#00000",
    };
  };

  return (
    <>
      <div className={`search-container ${props.active}`}>
        <input type="text" placeholder="Search here..." />
        <Search className="i" />
      </div>
      <div className={`nav-links-container ${props.active}`}>
        <div className="nav-link">
          <NavLink style={navLinkStyle} to="/">
            Home
          </NavLink>
        </div>
        <div className="nav-link">
          <NavLink style={navLinkStyle} to="/findtalent">
            Find talent
          </NavLink>
        </div>
        <div className="nav-link">
          <NavLink style={navLinkStyle} to="/findwork">
            Find work
          </NavLink>
        </div>
        <div className="nav-link">
          <NavLink style={navLinkStyle} to="/findpartner">
            Find partner
          </NavLink>
        </div>
      </div>
    </>
  );
};

const curr_user = {
  name: "Noman",
  image: userImage,
};

const message_notification = [{}];

const renderMessageToggle = () => (
      <div className="chat-dropdown">
        Message(5)
      </div>
);


const renderOrderToggle = () => (
      <div className="order-dropdown">
        Order(2)
      </div>
);

const renderFooter = () => {};

const user_menu = [
  {
    content: "Profile",
  },
  {
    content: "Dashboard",
  },
  {
    content: "Manage Requests",
  },
  {
    content: "Post a Request",
  },
  {
    content: "Settings",
  },
  {
    content: "English",
  },
  {
    content: "My wallet",
  },
  {
    content: "Logout",
  },
];

const renderUserToggle = (user) => (
  <div className="user-img">
    <img src={user.image} alt="userImage" />
  </div>
);

const renderUserMenu = (item, index) => (
  <a href="/" key={index}>
    <div className="user-menu-item">
      <span>{item.content}</span>
    </div>
  </a>
);

const Navbar = (props) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="navbar">
      <div className="nav-menu">
        <Dehaze onClick={() => setToggle(true)} />
        {toggle ? (
          <motion.div
            initial={{ translateX: "-100%" }}
            animate={{ translateX: "0%" }}
            end={{ translateX: "-100%" }}
            zIndex="10000"
            className="nav-sidebar"
          >
            <HiX onClick={() => setToggle(false)} />
            <div className="nav-small">
              <SearchAndLinks />
            </div>
          </motion.div>
        ) : (
          ""
        )}
      </div>
      <div className="logo">
        <NavLink to="/">
          <span>FREELANCE</span>
        </NavLink>
      </div>
      <SearchAndLinks active="active" />

      {props.loggedIn === "no" ? (
        <div className="nav-log-menu">
          <div className="nav-link">
            <NavLink to="/login">Log In</NavLink>
          </div>
          <div className="nav-link button">
            <NavLink to="/signup">
              <button>Sign Up</button>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="nav-log-menu">
          <div className="message-notify">
            <Dropdown
              customToggle={() => renderMessageToggle()}
              contentData={user_menu}
              renderItems={(item, index) => renderUserMenu(item, index)}
            />
          </div>
          <div className="order-notify">
            <Dropdown 
            customToggle={() => renderOrderToggle()}
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}/>
          </div>
          <div className="user-profile">
            <Dropdown
              customToggle={() => renderUserToggle(curr_user)}
              contentData={user_menu}
              renderItems={(item, index) => renderUserMenu(item, index)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
