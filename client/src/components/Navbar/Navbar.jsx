import { Dehaze, Search } from "@material-ui/icons";
import { motion } from "framer-motion";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./navbar.scss";
import userImage from "../../assets/images/userImage.jpg";
import { Dropdown } from "../import";
import { NavLink, Link } from "react-router-dom";

const SearchAndLinks = (props) => {
  const navLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? "#349eff" : "#00000",
    };
  };

  const searchItemClick = (e) => {
    const title = e.currentTarget.querySelector('.item-title').innerText;
    const dropdownCategory = document.querySelector('.dropdown-select');
    const searchInput = document.querySelector('.search-container input');
    if(title === "Find Talent") {
      searchInput.placeholder = 'Find Talent';
      dropdownCategory.classList.remove('active');
    }
    else if(title === "Find Work") {
      searchInput.placeholder = 'Find Work';
      dropdownCategory.classList.remove('active');
    }
    else if (title === "Find Partner") {
      searchInput.placeholder = 'Find Partner';
      dropdownCategory.classList.remove('active');
    }
  }

  const toggleSearchDropdown = (e) => {
    const dropdownCategory = document.querySelector('.dropdown-select');
    const searchSvg = document.querySelector('.search-container .i');
    const downSvg = document.querySelector('.search-container .down');
    const dropdownRecommend = document.querySelector('.dropdown-recommend');
    const searchInput = document.querySelector('.search-container input');

    if(e.target==downSvg){
      if(dropdownRecommend.classList.contains('active'))
        dropdownRecommend.classList.remove('active');
      dropdownCategory.classList.toggle('active');
    }
    else if(searchInput.placeholder!=="Search here..."&&(e.target==searchInput||e.target==searchSvg)){
      dropdownRecommend.classList.toggle('active');
    }
    else if(e.target==searchInput||e.target==searchSvg){
      dropdownCategory.classList.toggle('active');
    }
  }

  return (
    <>
      <div className={`search-container ${props.active}`} onClick={(e)=>toggleSearchDropdown(e)}>
        <input type="text" placeholder="Search here..." />
        <i class='bx bxs-chevron-down down'></i>
        <Search className="i" />
        <div className="dropdown-select " >
          <div className="dropdown-item" onClick={(e)=>searchItemClick(e)}>
            <div className="item-left">
              <i className="bx bxs-cart"></i>
            </div>
            <div className="item-right">
              <div className="item-title">Find Talent</div>
              <div className="item-desc">Hire freelancers</div>
            </div>
          </div>
          <div className="dropdown-item" onClick={(e)=>searchItemClick(e)}>
            <div className="item-left">
              <i className="bx bxs-cart"></i>
            </div>
            <div className="item-right">
              <div className="item-title">Find Work</div>
              <div className="item-desc">Find work as freelancer</div>
            </div>
          </div>
          <div className="dropdown-item" onClick={(e)=>searchItemClick(e)}>
            <div className="item-left">
              <i className="bx bxs-cart"></i>
            </div>
            <div className="item-right">
              <div className="item-title">Find Partner</div>
              <div className="item-desc">Find your partner</div>
            </div>
          </div>
        </div>
        <div className="dropdown-recommend " >
          Hi i am recommend
        </div>
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

const user_message = [
  {
    user_img: { userImage },
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos quo minus omnis veritatis non sapiente enim ab fuga vero deleniti nisi nobis ea, illum aliquam officiis, id impedit eos similique?",
  },
  {
    user_img: { userImage },
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos quo minus omnis veritatis non sapiente enim ab fuga vero deleniti nisi nobis ea, illum aliquam officiis, id impedit eos similique?",
  },
  {
    user_img: { userImage },
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos quo minus omnis veritatis non sapiente enim ab fuga vero deleniti nisi nobis ea, illum aliquam officiis, id impedit eos similique?",
  },
  {
    user_img: { userImage },
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos quo minus omnis veritatis non sapiente enim ab fuga vero deleniti nisi nobis ea, illum aliquam officiis, id impedit eos similique?",
  },
  {
    user_img: { userImage },
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos quo minus omnis veritatis non sapiente enim ab fuga vero deleniti nisi nobis ea, illum aliquam officiis, id impedit eos similique?",
  },
  {
    user_img: { userImage },
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos quo minus omnis veritatis non sapiente enim ab fuga vero deleniti nisi nobis ea, illum aliquam officiis, id impedit eos similique?",
  },
  {
    user_img: { userImage },
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos quo minus omnis veritatis non sapiente enim ab fuga vero deleniti nisi nobis ea, illum aliquam officiis, id impedit eos similique?",
  },
  {
    user_img: { userImage },
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos quo minus omnis veritatis non sapiente enim ab fuga vero deleniti nisi nobis ea, illum aliquam officiis, id impedit eos similique?",
  },
  {
    user_img: { userImage },
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos quo minus omnis veritatis non sapiente enim ab fuga vero deleniti nisi nobis ea, illum aliquam officiis, id impedit eos similique?",
  },
  {
    user_img: { userImage },
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos quo minus omnis veritatis non sapiente enim ab fuga vero deleniti nisi nobis ea, illum aliquam officiis, id impedit eos similique?",
  },
];

const renderMessageToggle = () => (
  <div className="chat-dropdown">Message({user_message.length})</div>
);

const renderMessageMenu = (item, index) => (
  <Link to="/chat" className="notification" key={index}>
    <div className="img">
      <img src={userImage} alt="user image" />
    </div>
    <div className="message">{item.message}</div>
  </Link>
);

const renderMessageFooter = () => (
  <Link to="/chat" className="btn">
    Chat
  </Link>
);

// const user_order = [];

// const renderOrderToggle = () => <div className="order-dropdown">Order(2)</div>;

// const renderOrderMenu = (item,index) => ();

// const renderOrderFooter = () => ();

const user_menu = [
  {
    content: "Profile",
    link: "/userprofile",
  },
  {
    content: "Dashboard",
    link: "/",
  },
  {
    content: "Manage Requests",
    link: "/",
  },
  {
    content: "Post a Request",
    link: "/postrequest",
  },
  {
    content: "My wallet",
    link: "/",
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

const Navbar = (props) => {
  const [toggle, setToggle] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn"));
  let navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("loggedIn", false);
    localStorage.setItem("username", undefined);
    localStorage.setItem("isDataTaken", false);
    setLoggedIn("false");
    navigate("/");
  };

  const renderUserMenu = (item, index) => {
    if (item.content === "Logout") {
      return (
        <a className="no-link" key={index} onClick={logout}>
          <div className="user-menu-item">
            <span>{item.content}</span>
          </div>
        </a>
      );
    } else {
      return (
        <Link to={item.link} key={index}>
          <div className="user-menu-item">
            <span>{item.content}</span>
          </div>
        </Link>
      );
    }
  };

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

      {loggedIn === "false" ? (
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
              contentData={user_message}
              renderItems={(item, index) => renderMessageMenu(item, index)}
              renderFooter={renderMessageFooter}
            />
          </div>
          {/* <div className="order-notify">
            <Dropdown
              customToggle={() => renderOrderToggle()}
              contentData={user_order}
              renderItems={(item, index) => renderOrderMenu(item, index)}
              renderFooter={renderOrderFooter}
            />
          </div> */}
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
