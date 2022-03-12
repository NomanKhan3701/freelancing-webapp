import { Dehaze, Search } from "@material-ui/icons";
import { motion } from "framer-motion";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import React, { useState } from "react";
import "./navbar.scss";
import userImage from "../../assets/images/userImage.jpg";
import { Dropdown } from "../import";
import { Link } from "react-router-dom";

const SearchAndLinks = (props) => {
  return (
    <>
      <div className={`search-container ${props.active}`}>
        <input type="text" placeholder="Search here..." />
        <Search className="i" />
      </div>
      <div className={`nav-links-container ${props.active}`}>
        <div className="nav-link active">
          <Link to="/">Home</Link>
        </div>
        <div className="nav-link">
          <Link to="/findtalent">Find talent</Link>
        </div>
        <div className="nav-link">
          <a href="#">Find work</a>
        </div>
        <div className="nav-link">
          <a href="#">Message</a>
        </div>
        <div className="nav-link">
          <a href="#">Orders</a>
        </div>
      </div>
    </>
  );
};

const curr_user = {
  name: 'Noman',
  image: userImage
}

const user_menu = [
  {
    "content": "Profile"
  },
  {
    "content": "Dashboard"
  },
  {
    "content": "Manage Requests"
  },
  {
    "content": "Post a Request"
  },
  {
    "content": "Settings"
  },
  {
    "content": "English"
  },
  {
    "content": "My wallet"
  },
  {
    "content": "Logout"
  }
]

const renderUserToggle = (user) => (
  <div className="user-img">
    <img src={user.image} alt="userImage" />
  </div>
)

const renderUserMenu = (item, index) => (
  <a href='/' key={index}>
    <div className="user-menu-item">
      <span>{item.content}</span>
    </div>
  </a>
)

const Navbar = (props) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="navbar">
      <div className="nav-menu">
        <Dehaze onClick={() => setToggle(true)} />
        {toggle ? (
          <motion.div
            initial={{translateX: "-100%"}}
            animate={{translateX: "0%"}}
            end={{translateX: "-100%"}}
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
        <span>FREELANCE</span>
      </div>
      <SearchAndLinks active="active" />

      {props.loggedIn === "no" ? (
        <div className="nav-log-menu">
          <div className="nav-link">
            <a href="">Log In</a>
          </div>
          <div className="nav-link button">
            <a href=""><button>Sign Up</button></a>
          </div>
        </div>
      ) : (
        <div className="user-profile">
          <Dropdown 
            customToggle = {() => renderUserToggle(curr_user)}
            contentData = {user_menu}
            renderItems = {(item, index) => renderUserMenu(item,index)}
            />
        </div>
      )}
    </div>
  );
};

export default Navbar;
