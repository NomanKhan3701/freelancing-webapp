import { Dehaze, Search } from "@material-ui/icons";
import { motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import React, { useState, useRef } from "react";
import "./navbar.scss";
import userImage from "../../assets/images/userImage.jpg";
import { Dropdown } from "../import";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router";


const SearchAndLinks = (props) => {
  const searchDropdownRef = useRef(null);
  let navigate = useNavigate();

  const clickOutsideRef = (toggle_ref) => {
    document.addEventListener("mousedown", (e) => {
      if (toggle_ref.current && !toggle_ref.current.contains(e.target)) {
        const dropdownCategory = document.querySelector(".dropdown-select");
        const dropdownRecommend = document.querySelector(".dropdown-recommend");
        if (dropdownCategory.classList.contains("active"))
          dropdownCategory.classList.remove("active");
        if (dropdownRecommend.classList.contains("active"))
          dropdownRecommend.classList.remove("active");
      }
    });
  };

  clickOutsideRef(searchDropdownRef);

  const navLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? "#349eff" : "#00000",
    };
  };

  const searchItemClick = (e) => {
    const title = e.currentTarget.querySelector(".item-title").innerText;
    const dropdownCategory = document.querySelector(".dropdown-select");
    const searchInput = document.querySelector(".search-container input");
    if (title === "Find Talent") {
      searchInput.placeholder = "Find Talent";
      dropdownCategory.classList.remove("active");
    } else if (title === "Find Work") {
      searchInput.placeholder = "Find Work";
      dropdownCategory.classList.remove("active");
    } else if (title === "Find Partner") {
      searchInput.placeholder = "Find Partner";
      dropdownCategory.classList.remove("active");
    }
  };

  const toggleSearchDropdown = (e) => {
    const dropdownCategory = document.querySelector(".dropdown-select");
    const searchSvg = document.querySelector(".search-container .i");
    const downSvg = document.querySelector(".search-container .down");
    const dropdownRecommend = document.querySelector(".dropdown-recommend");
    const searchInput = document.querySelector(".search-container input");

    if (e.target === downSvg) {
      if (dropdownRecommend.classList.contains("active"))
        dropdownRecommend.classList.remove("active");
      dropdownCategory.classList.toggle("active");
    } else if (
      searchInput.placeholder !== "Search here..." &&
      (e.target === searchInput || e.target === searchSvg) &&
      !dropdownCategory.classList.contains("active")
    ) {
      dropdownRecommend.classList.toggle("active");
    } else if (e.target === searchInput || e.target === searchSvg) {
      dropdownCategory.classList.toggle("active");
    }
  };

  const searchRecommendClick = (e) => {
    const searchInput = document.querySelector(".search-container input");
    const dropdownRecommend = document.querySelector(".dropdown-recommend");
    const dropdownRecommendItems = document.querySelector(".dropdown-recommend .recommend-items").children;
    searchInput.value = e.target.innerText;
    dropdownRecommend.classList.remove('active');
    for(let item of dropdownRecommendItems){
      if(item.innerText.includes(searchInput.value)&&!item.classList.contains('active'))
        item.classList.add('active');
      else if(!item.innerText.includes(searchInput.value)&&item.classList.contains('active'))
        item.classList.remove('active');
    }
  }

  const handleSearchInput = (e) => {
    const dropdownRecommendItems = document.querySelector(".dropdown-recommend .recommend-items").children;
    for(let item of dropdownRecommendItems){
      if(item.innerText.includes(e.target.value)&&!item.classList.contains('active'))
        item.classList.add('active');
      else if(!item.innerText.includes(e.target.value)&&item.classList.contains('active'))
        item.classList.remove('active');
    }
  }

  const handleEnterOnSearch = (e) => {
    const searchInput = document.querySelector(".search-container input");
    if(e.key === 'Enter'){
      if(searchInput.placeholder === 'Find Talent'){
        navigate('/findtalent/category', {state:{category: searchInput.value.replace(/ /g, "").toLowerCase()}});
      }else if(searchInput.placeholder === 'Find Work'){
        navigate('/findwork/category', {state: {category: searchInput.value.replace(/ /g, "").toLowerCase()}});
      }
    }
  }

  return (
    <>
      <div
        className={`search-container ${props.active}`}
        onClick={(e) => toggleSearchDropdown(e)}
        ref={searchDropdownRef}
      >
        <input type="text" placeholder="Search here..." onKeyDown={(e)=>handleEnterOnSearch(e)} onChange={(e)=>handleSearchInput(e)}/>
        <i className="bx bxs-chevron-down down"></i>
        <Search className="i" />
        <div className="dropdown-select ">
          <div className="dropdown-item" onClick={(e) => searchItemClick(e)}>
            <div className="item-left">
              <i className="bx bxs-cart"></i>
            </div>
            <div className="item-right">
              <div className="item-title">Find Talent</div>
              <div className="item-desc">Hire freelancers</div>
            </div>
          </div>
          <div className="dropdown-item" onClick={(e) => searchItemClick(e)}>
            <div className="item-left">
              <i className="bx bxs-cart"></i>
            </div>
            <div className="item-right">
              <div className="item-title">Find Work</div>
              <div className="item-desc">Find work as freelancer</div>
            </div>
          </div>
          <div className="dropdown-item" onClick={(e) => searchItemClick(e)}>
            <div className="item-left">
              <i className="bx bxs-cart"></i>
            </div>
            <div className="item-right">
              <div className="item-title">Find Partner</div>
              <div className="item-desc">Find your partner</div>
            </div>
          </div>
        </div>
        <div className="dropdown-recommend ">
          <div className="recommend-items">
            <div className="recommend-item active" onClick={(e) => searchRecommendClick(e)}>Frontend Web developer</div>
            <div className="recommend-item active" onClick={(e) => searchRecommendClick(e)}>Designer</div>
            <div className="recommend-item active" onClick={(e) => searchRecommendClick(e)}>App developer</div>
            <div className="recommend-item active" onClick={(e) => searchRecommendClick(e)}>Model</div>
            <div className="recommend-item active" onClick={(e) => searchRecommendClick(e)}>Cyber Security</div>
            <div className="recommend-item active" onClick={(e) => searchRecommendClick(e)}>UI/UX Designer</div>
            <div className="recommend-item active" onClick={(e) => searchRecommendClick(e)}>Logo Creator</div>
            <div className="recommend-item active" onClick={(e) => searchRecommendClick(e)}>Video Editor</div>
            <div className="recommend-item active" onClick={(e) => searchRecommendClick(e)}>Backend Web developer</div>
          </div>
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
      <img src={userImage} alt="User" />
    </div>
    <div className="message">{item.message}</div>
  </Link>
);

const renderMessageFooter = () => (
  <Link to="/chat" className="btn">
    Chat
  </Link>
);

const user_menu = [
  {
    content: "Profile",
    link: "/userprofile",
  },
  {
    content: "Work Posted",
    link: `/userprofile/allpost`,
  },
  {
    content: "Freelancing Work",
    link: `/userprofile/allwork`,
  },
  {
    content: "About",
    link: "/about",
  },
  {
    content: "Give us feedback",
    link: "/feedback",
  },
  {
    content: "Settings",
    link: "/settings",
  },
  {
    content: "Logout",
  },
];

const Navbar = (props) => {
  const [toggle, setToggle] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn"));
  let navigate = useNavigate();
  let image = localStorage.getItem("image");
  if (!image || (image && image === "undefined")) {
    image = `https://ui-avatars.com/api/?name=${localStorage.getItem(
      "username"
    )}`;
  }
  const logout = () => {
    localStorage.setItem("loggedIn", "false");
    localStorage.setItem("username", undefined);
    localStorage.setItem("isDataTaken", "false");
    localStorage.setItem("image", undefined);
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
        <div
          className="user-menu-item"
          key={index}
          onClick={() =>
            navigate(item.link, {
              state: { username: localStorage.getItem("username") },
            })
          }
        >
          <span>{item.content}</span>
        </div>
      );
    }
  };
  const renderUserToggle = () => (
    <div className="user-img">
      <img src={image} alt="User" />
    </div>
  );
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
              customToggle={() => renderUserToggle()}
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
