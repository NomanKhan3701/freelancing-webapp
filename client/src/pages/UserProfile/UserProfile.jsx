import React, { useEffect, useState } from "react";
import {
  Navbar,
  WorkDoneSlider,
  WorkPostedSlider,
} from "../../components/import";
import { motion } from "framer-motion";
import "./UserProfile.scss";
import { Link } from "react-router-dom";
import userBanner from "../../assets/images/bgUser.jpg";

import userImg from "../../assets/images/Cha2.jpg";
import axios from "axios";
import { FullScreenLoader } from "../../components/import";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
toast.configure();

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const { state } = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [otherUser, setOtherUser] = useState();
  useEffect(() => {
    let username;
    try {
      username = state.username;
    } catch (error) {
      username = localStorage.getItem("username");
    }
    setOtherUser(username);
    axios
      .get(`http://localhost:8080/userprofiledata/${username}`)
      .then(function (response) {
        setUserData({
          ...response.data.data._doc,
          workPosted: response.data.data.workPosted,
          freelancingWork: response.data.data.freelancingWork,
          isDataTaken: response.data.data.isUserDataTaken,
        });
        localStorage.setItem("isDataTaken", response.data.data.isUserDataTaken);
        setLoading(false);
      });
  }, []);

  const isDataTaken = localStorage.getItem("isDataTaken");
  if (localStorage.getItem("username") === "undefined") {
    toast.success("You must login before.", {
      position: "top-center",
    });
    navigate("/login");
    return <FullScreenLoader />;
  }
  if (isDataTaken === "false") {
    toast.success("You must fill your details before viewing the profile.", {
      position: "top-center",
    });
    navigate("/userprofileinput");
    return <FullScreenLoader />;
  }

  if (isLoading) {
    return <FullScreenLoader />;
  }

  const chat = (event) => {
    navigate("/chat", {
      state: {
        receiver: otherUser,
      },
    });
  };
  const goToAllPost = (event) => {
    navigate("/userprofile/allpost", {
      state: {
        workPosted: userData.workPosted,
      },
    });
  };
  const goToAllWork = (event) => {
    navigate("/userprofile/allwork", {
      state: {
        freelancingWork: userData.freelancingWork,
      },
    });
  };
  return (
    <div className="user-profile-container">
      <Navbar />
      <div className="user-profile-info">
        <div className="profile-header">
          {/* <div className="profile-banner">
            <img src={userBanner} alt="banner" />
          </div> */}
          <motion.div
            initial={{ opacity: 0, translateX: -200 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 1, ease: "linear" }}
            className="user-img"
          >
            {userData.image ? (
              <img src={userData.image} alt="user image" />
            ) : (
              <img src={userImg} alt="user image" />
            )}
          </motion.div>
          <div className="user-info">
            <motion.h1
              initial={{ opacity: 0, translateY: -200 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 1, ease: "linear" }}
              className="user-name"
            >
              {userData.fullname}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, translateX: 400 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 1, ease: "linear" }}
              className="desc"
            >
              {userData.desc}
            </motion.div>
          </div>
        </div>
        <div className="profile-main">
          <div className="profile-main-left">
            <motion.div
              initial={{ opacity: 0, translateX: -200 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 1, ease: "linear" }}
              className="rating-container"
            >
              <h3>Rating </h3>
              <div className="rating">
                {userData.rating === 0 ? "new" : userData}
                <i className="bx bxs-star"></i>
              </div>
            </motion.div>
            <div className="contact-info">
              <div className="contact">
                <motion.div
                  initial={{ opacity: 0, translateX: -200 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ duration: 1, ease: "linear" }}
                  className="contact-item"
                >
                  <i className="bx bxl-gmail"></i>
                  <div>{userData.email}</div>
                </motion.div>
                {userData.linkdin && (
                  <motion.div
                    initial={{ opacity: 0, translateX: -200 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ duration: 1, ease: "linear" }}
                    className="contact-item"
                  >
                    <i className="bx bxl-gmail"></i>
                    <div>{userData.linkdin}</div>
                  </motion.div>
                )}
                {localStorage.getItem("username") !== otherUser && (
                  <motion.div
                    initial={{ opacity: 0, translateX: -200 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ duration: 1, ease: "linear" }}
                    className="btn"
                  >
                    <button onClick={chat} datausername={otherUser}>
                      Chat
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
          <div className="main-container">
            <div className="skills-container">
              <h1>Category</h1>
              <div className="skills">
                {userData.category.map((category) => {
                  return <div className="skill">{category}</div>;
                })}
              </div>
            </div>
            <div className="skills-container">
              <h1>Skills</h1>
              <div className="skills">
                {userData.skills.map((skill) => {
                  return <div className="skill">{skill}</div>;
                })}
              </div>
            </div>

            <div className="latest-work-posted">
              <div className="info-section">
                <h1>Latest work posted</h1>
                <div className="link-button" onClick={goToAllPost}>
                  All post
                </div>
              </div>
              <div className="work-cards">
                <WorkPostedSlider work={userData.workPosted} />
              </div>
            </div>
            <div className="latest-work-posted">
              <div className="info-section">
                <h1>Work done</h1>
                <div className="link-button" onClick={goToAllWork}>
                  All work
                </div>
              </div>
              <div className="work-cards">
                <WorkDoneSlider freelance={userData.freelancingWork} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
