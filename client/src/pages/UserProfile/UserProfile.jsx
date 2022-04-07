import React from "react";
import { Navbar, WorkDoneSlider, WorkPostedSlider } from "../../components/import";
import { motion } from "framer-motion";
import "./UserProfile.scss";
import { Link } from "react-router-dom";
import userBanner from "../../assets/images/bgUser.jpg";

import userImg from "../../assets/images/Cha2.jpg";

const UserProfile = () => {
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
            <img src={userImg} alt="" />
          </motion.div>
          <div className="user-info">
            <motion.h1
              initial={{ opacity: 0, translateY: -200 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 1, ease: "linear" }}
              className="user-name"
            >
              Noman
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, translateX: 400 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 1, ease: "linear" }}
              className="desc"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem in suscipit corporis voluptatibus. Tempore, fugiat non
              distinctio ipsa, commodi amet veritatis, molestias porro libero
              dolorum itaque voluptatibus at explicabo! Fugiat!
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
                4<i className="bx bxs-star"></i>
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
                  <div>dad.OP@gmail.com</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, translateX: -200 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ duration: 1, ease: "linear" }}
                  className="btn"
                >
                  <Link to="/chat">Chat</Link>
                </motion.div>
              </div>
            </div>
          </div>
          <div className="main-container">
            <div className="skills-container">
              <h1>Skills</h1>
              <div className="skills">
                <div className="skill">ReactJs</div>
                <div className="skill">HTML</div>
                <div className="skill">CSS</div>
                <div className="skill">VanillaJs</div>
                <div className="skill">NodeJs</div>
              </div>
            </div>
            <div className="latest-work-posted">
              <div className="info-section">
                <h1>Latest work posted</h1>
                <Link to="allPost">All post</Link>
              </div>
              <div className="work-cards">
                <WorkDoneSlider />
              </div>
            </div>
            <div className="latest-work-posted">
              <div className="info-section">
                <h1>Work done</h1>
                <Link to="allWork">All work</Link>
              </div>
              <div className="work-cards">
                <WorkPostedSlider/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
