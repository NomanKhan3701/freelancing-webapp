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
import LoadingSpinner from "./LoadingSpinner";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
toast.configure();

const UserProfile = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const { state } = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [postWorkData, setPostWorkData] = useState({
    title: "",
    desc: "",
    category: "",
    skills: [],
    minBid: null,
    maxBid: null,
  });
  useEffect(() => {
    let username;
    try {
      username = state.username;
    } catch (error) {
      username = localStorage.getItem("username");
    }
    // console.log(username);
    axios
      .get(`http://localhost:8080/userprofiledata/${username}`)
      .then(function (response) {
        setUserData(response.data.data);
        setLoading(false);
      });
  }, []);

  const isDataTaken = localStorage.getItem("isDataTaken");
  if (localStorage.getItem("username") === "undefined") {
    toast.success("You must login before.", {
      position: "top-center",
    });
    navigate("/login");
  }
  if (isDataTaken === "false") {
    toast.success("You must fill your details before viewing the profile.", {
      position: "top-center",
    });
    navigate("/userprofileinput");
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const chat = () => {};
  const goToAllPosts = () => {
    navigate("/userprofile/allpost", {
      state: {
        wordPosted: userData.workPosted,
      },
    });
  };
  const goToAllFreelanceWorks = () => {
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
            <img src={userData.image} alt="user image" />
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
                <motion.div
                  initial={{ opacity: 0, translateX: -200 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ duration: 1, ease: "linear" }}
                  className="btn"
                >
                  <button onClick={chat}>Chat</button>
                </motion.div>
              </div>
            </div>
          </div>
          <div className="main-container">
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
                <button onClick={goToAllPosts}> All Posts </button>
              </div>
              <div className="work-cards">
                <WorkPostedSlider work={userData.workPosted} />
              </div>
            </div>
            <div className="latest-work-posted">
              <div className="info-section">
                <h1>Work done</h1>
                <Link to="allWork">All work</Link>
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
