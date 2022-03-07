import React from "react";
import "./header.scss";
import { motion } from "framer-motion";
import headerMan from "../../assets/images/profile.png";
import circle from "../../assets/images/circle.svg";

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <div className="header-left-heading">
          Find Out Talented<span> Freelancers</span>
        </div>
        <div className="header-content-desc">
          Freelancers with better reviews and with higher profile work here
        </div>
        <div className="header-buttons">
          <button className="btn button1">Find Talent</button>
          <button className="btn button2">Find work</button>
        </div>
      </div>
      <div className="header-right">
        <div className="freelance-img">
          <img src={headerMan} alt="" className="freelance-man-img" />
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            src={circle}
            alt="profile_circle"
            className="overlay_circle"
          />
            <motion.div
              initial={{opacity: 0, translateY: -300 }}
              animate={{opacity: 1, translateY: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1 }}
              className="pop box-left-mid"
            >
              <h2>Skills</h2>
              <div className="skill-desc">
                We have the most skillful Freelancers
              </div>
            </motion.div>
            <motion.div
              initial={{opacity: 0, translateX: 300 }}
              animate={{opacity: 1, translateX: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
              className="pop box-right-top"
            >
              <h2>Number of freelancer</h2>
              <div className="skill-desc">
                We have the most skillful Freelancers
              </div>
            </motion.div>
            <motion.div
              initial={{opacity: 0, translateY: -300 }}
              animate={{opacity: 1, translateY: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 2 }}
              className="pop box-right-bottom"
            >
              <h2>Skills</h2>
              <div className="skill-desc">
                We have the most skillful Freelancers
              </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Header;
