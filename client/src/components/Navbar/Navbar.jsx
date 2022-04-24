import { Dehaze, Search } from "@material-ui/icons";
import { motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import "./navbar.scss";
import { Dropdown } from "../import";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectSocket, setSocket } from "../../features/socket/socketSlice";
import {
  selectNewMessage,
  setNewMessage,
} from "../../features/socket/newMessage";
import { selectNewBid, setNewBid } from "../../features/socket/newBidSlice";
import {
  selectNewComment,
  setNewComment,
} from "../../features/socket/newCommentSlice";
import {
  selectBidAccepted,
  setBidAccepted,
} from "../../features/socket/bidAcceptedSlice";
import { update } from "../../features/chatMain/chatMainSlice";
import { setOnlineUsers } from "../../features/socket/onlineUsers";
import { setRoom } from "../../features/socket/roomSlice";
import { selectFeedback } from "../../features/socket/feedbackSlice";
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
    const dropdownRecommendItems = document.querySelector(
      ".dropdown-recommend .recommend-items"
    ).children;
    searchInput.value = e.target.innerText;
    dropdownRecommend.classList.remove("active");
    for (let item of dropdownRecommendItems) {
      if (
        item.innerText
          .toLowerCase()
          .includes(searchInput.value.toLowerCase()) &&
        !item.classList.contains("active")
      )
        item.classList.add("active");
      else if (
        !item.innerText
          .toLowerCase()
          .includes(searchInput.value.toLowerCase()) &&
        item.classList.contains("active")
      )
        item.classList.remove("active");
    }
  };

  const handleSearchInputDropdown = (e) => {
    const dropdownRecommendItems = document.querySelector(
      ".dropdown-recommend .recommend-items"
    ).children;
    for (let item of dropdownRecommendItems) {
      if (
        item.innerText.toLowerCase().includes(e.target.value.toLowerCase()) &&
        !item.classList.contains("active")
      )
        item.classList.add("active");
      else if (
        !item.innerText.toLowerCase().includes(e.target.value.toLowerCase()) &&
        item.classList.contains("active")
      )
        item.classList.remove("active");
    }
  };

  const handleEnterOnSearch = (e) => {
    const searchInput = document.querySelector(".search-container input");
    console.log();
    if (e.key === "Enter") {
      handleSearchInput();
    } else if(searchInput.placeholder!="Search here..."){
      const searchInput = document.querySelector(".search-container input");
      const dropdownRecommend = document.querySelector(".dropdown-recommend");
      const dropdownCategory = document.querySelector(".dropdown-select");
      if (dropdownCategory.classList.contains("active"))
        dropdownCategory.classList.remove("active");
      dropdownRecommend.classList.add("active");
    }
  };

  const handleSearchInput = () => {
    const searchInput = document.querySelector(".search-container input");
    if (searchInput.placeholder === "Find Talent") {
      console.log(searchInput.value.replace(/[ /]/g, "").toLowerCase());
      navigate("/findtalent/category", {
        state: {
          category: searchInput.value.replace(/[ /]/g, "").toLowerCase(),
        },
      });
    } else if (searchInput.placeholder === "Find Work") {
      navigate("/findwork/category", {
        state: {
          category: searchInput.value.replace(/[ /]/g, "").toLowerCase(),
        },
      });
    }
  };

  const recommendDropdown = [
    "Frontend Web developer",
    "Designer",
    "App developer",
    "Model",
    "Cyber Security",
    "UI/UX Designer",
    "Logo Creator",
    "Video Editor",
    "Backend Web developer",
  ];

  return (
    <>
      <div
        className={`search-container ${props.active}`}
        onClick={(e) => toggleSearchDropdown(e)}
        ref={searchDropdownRef}
      >
        <input
          type="text"
          placeholder="Search here..."
          onKeyDown={(e) => handleEnterOnSearch(e)}
          onChange={(e) => handleSearchInputDropdown(e)}
        />
        <i className="bx bxs-chevron-down down"></i>
        <Search className="i" onClick={(e) => handleSearchInput(e)} />
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
            {recommendDropdown.map((category, index) => {
              return (
                <div
                  className="recommend-item active"
                  onClick={(e) => searchRecommendClick(e)}
                  key={index}
                >
                  {category}
                </div>
              );
            })}
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
    link: "/websitefeedback",
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
  //for chat
  const socket = useSelector(selectSocket);
  const dispatch = useDispatch();
  localStorage.setItem("room", "global");
  const [toggle, setToggle] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn"));
  const [notificationCount, setNotificationCount] = useState(0);
  const [notification, setNotification] = useState([]);
  const newMessage = useSelector(selectNewMessage);
  const newBid = useSelector(selectNewBid);
  const newComment = useSelector(selectNewComment);
  const bidAccepted = useSelector(selectBidAccepted);
  const feedback = useSelector(selectFeedback);

  useEffect(() => {
    if (newMessage) {
      setNotificationCount((data) => {
        return data + 1;
      });
      setNotification((data) => {
        return [...data, newMessage];
      });
    }
  }, [newMessage]);

  useEffect(() => {
    if (feedback) {
      console.log("feedback");
      console.log(feedback);
      setNotificationCount((data) => {
        return data + 1;
      });
      setNotification((data) => {
        return [...data, feedback];
      });
    }
  }, [feedback]);

  useEffect(() => {
    if (newBid) {
      setNotificationCount((data) => {
        return data + 1;
      });
      setNotification((data) => {
        return [...data, newBid];
      });
    }
  }, [newBid]);
  useEffect(() => {
    if (newComment) {
      setNotificationCount((data) => {
        return data + 1;
      });
      setNotification((data) => {
        return [...data, newComment];
      });
    }
  }, [newComment]);
  useEffect(() => {
    if (bidAccepted) {
      setNotificationCount((data) => {
        return data + 1;
      });
      setNotification((data) => {
        return [...data, bidAccepted];
      });
    }
  }, [bidAccepted]);

  let navigate = useNavigate();
  let image = localStorage.getItem("image");
  if (!image || (image && image === "undefined")) {
    image = `https://ui-avatars.com/api/?name=${localStorage.getItem(
      "username"
    )}`;
  }

  const renderMessageToggle = () => (
    <div className="chat-dropdown">
      Notifications
      {notificationCount !== 0 && "(" + notificationCount + ")"}
    </div>
  );

  const logout = () => {
    localStorage.setItem("loggedIn", "false");

    localStorage.setItem("isDataTaken", "false");
    localStorage.setItem("image", undefined);
    localStorage.setItem("room", undefined);
    if (socket) {
      socket.emit("offline", localStorage.getItem("username"));
      socket.disconnect(); //socket.emit("disconnect") gives error as sdisconnect is reserved word
      socket.off();
    }
    localStorage.setItem("username", undefined);
    setLoggedIn("false");
    dispatch(
      update({
        image: "default",
        receiver: "default",
        status: "default",
        room: "default",
        chatData: [],
      })
    );
    dispatch(setBidAccepted(null));
    dispatch(setNewBid(null));
    dispatch(setNewComment(null));
    dispatch(setNewMessage(null));
    dispatch(setOnlineUsers([]));
    dispatch(setRoom(null));
    dispatch(setSocket(null));
    navigate("/");
  };

  const renderUserMenu = (item, index) => {
    if (item.content.toLowerCase() === "logout") {
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

  const goTo = (data) => {
    setNotificationCount((count) => {
      return count - 1;
    });
    setNotification((notifications) => {
      return notifications.filter((notification) => notification !== data);
    });
    if ("message" in data) {
      navigate(`/chat/`);
    } else if ("bid" in data && "username" in data) {
      navigate("/findwork/bid", {
        state: {
          bid: data,
        },
      });
    } else if ("bid" in data) {
      navigate("/findwork/bid", {
        state: {
          bid: data,
        },
      });
    } else if ("bidAccepted" in data && "freelancer" in data) {
      navigate("/userprofile/allwork", {
        state: {
          username: localStorage.getItem("username"),
        },
      });
    } else if ("bidAccepted" in data) {
      navigate("/userprofile/allwork", {
        state: {
          username: localStorage.getItem("username"),
        },
      });
    } else if ("comment" in data && "username" in data) {
      navigate("/findwork/bid", {
        state: {
          comment: data,
        },
      });
    } else if ("comment" in data) {
      navigate("/findwork/bid", {
        state: {
          comment: data,
        },
      });
    } else if ("offlineChatNotifications" in data) {
      navigate("/chat");
    } else if ("feedback" in data) {
      navigate("/feedback", {
        state: {
          client: data.client,
          workId: data.workId,
        },
      });
    }
  };

  const renderMessageMenu = (item, index) => {
    if ("bid" in item && "username" in item) {
      return (
        <div
          className="notification"
          key={index}
          id={index}
          onClick={() => goTo(item)}
        >
          <div className="message">{`Freelancers have bidded on your work with title ${item.title}`}</div>
          <div className="message-time">{item.time}</div>
        </div>
      );
    } else if ("bid" in item) {
      return (
        <div
          className="notification"
          key={index}
          id={index}
          onClick={() => goTo(item)}
        >
          <div className="message">{`New Bid added to your work ${item.title}`}</div>
          <div className="message-time">{item.time}</div>
        </div>
      );
    } else if ("comment" in item) {
      return (
        <div
          className="notification"
          key={index}
          id={index}
          onClick={() => goTo(item)}
        >
          <div className="message">{`New comment added to your work ${item.title}`}</div>
          <div className="message-time">{item.time}</div>
        </div>
      );
    } else if ("comment" in item && "username" in item) {
      return (
        <div
          className="notification"
          key={index}
          id={index}
          onClick={() => goTo(item)}
        >
          <div className="message">{`Freelancers have commentd on your work with title ${item.title}`}</div>
          <div className="message-time">{item.time}</div>
        </div>
      );
    } else if ("bidAccepted" in item && "freelancer" in item) {
      return (
        <div
          className="notification"
          key={index}
          id={index}
          onClick={() => goTo(item)}
        >
          <div className="message">{`Your bid on work ${item.title} got accepted.`}</div>
          <div className="message-time">{item.time}</div>
        </div>
      );
    } else if ("bidAccepted" in item) {
      return (
        <div
          className="notification"
          key={index}
          id={index}
          onClick={() => goTo(item)}
        >
          <div className="message">{`Your bid on work ${item.title} got accepted.`}</div>
          <div className="message-time">{item.time}</div>
        </div>
      );
    } else if ("offlineChatNotifications" in item) {
      return (
        <div
          className="notification"
          key={index}
          id={index}
          onClick={() => goTo(item)}
        >
          <div className="message">{"You have few new messages."}</div>
        </div>
      );
    } else if ("feedback" in item) {
      const clientImage = `https://ui-avatars.com/api/?name=${item.client}`;
      return (
        <div
          className="notification"
          key={index}
          id={item.username}
          onClick={() => goTo(item)}
        >
          <div className="img">
            <img src={item.image || clientImage} alt="User" />
          </div>
          <div className="message">{`Congrats on completing your freelancing work with ${item.client} on project ${item.title}`}</div>
        </div>
      );
    } else {
      return (
        <div
          className="notification"
          key={index}
          id={item.username}
          onClick={() => goTo(item)}
        >
          <div className="img">
            <img src={item.image} alt="User" />
          </div>
          <div className="message">{item.message}</div>
          <div className="message-time">{item.time}</div>
        </div>
      );
    }
  };

  const renderMessageFooter = () => (
    <Link to="/chat" className="btn">
      Chat
    </Link>
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
              contentData={notification}
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
