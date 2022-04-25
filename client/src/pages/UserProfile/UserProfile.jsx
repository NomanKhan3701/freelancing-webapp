import React, { useEffect, useState } from "react";
import {
  Navbar,
  WorkDoneSlider,
  WorkPostedSlider,
} from "../../components/import";
import { motion } from "framer-motion";
import "./UserProfile.scss";
import axios from "axios";
import { FullScreenLoader } from "../../components/import";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
const server_url = process.env.REACT_APP_server_url;

toast.configure();
// console.log(server_url);

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const { state } = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [otherUser, setOtherUser] = useState();
  const [inFindPartner, setInFindPartner] = useState(false);
  const params = useParams();

  const addInPartner = () => {
    let confirm = window.confirm(`Are you sure you want to ${inFindPartner ? "remove" : "add"} your name from Find Partner?`)
    confirm && setInFindPartner(inFindPartner => !inFindPartner);
  }

  useEffect(() => {
    const isDataTaken = localStorage.getItem("isDataTaken");
    if (
      localStorage.getItem("username") &&
      localStorage.getItem("username") === "undefined"
    ) {
      toast.success("You must login before.", {
        position: "top-center",
      });
      navigate("/login");
      return <FullScreenLoader />;
    }
    if (isDataTaken && isDataTaken === "false") {
      toast.success("You must fill your details before viewing the profile.", {
        position: "top-center",
      });
      navigate("/userprofileinput");
      return <FullScreenLoader />;
    }

    let username;
    try {
      if (state) {
        username = state.username;
      } else if (Object.keys(params).length !== 0) {
        username = params.username;
      } else {
        username = localStorage.getItem("username");
      }
    } catch (error) {
      username = localStorage.getItem("username");
    }
    setOtherUser(username);
    axios
      .get(`${server_url}/userprofiledata/${username}`)
      .then((response) => {
        console.log(response.data)
        setUserData({
          ...response.data.userProfileData,
          workPosted: response.data.workPosted,
          freelancingWork: response.data.freelancingWork,
          isDataTaken: response.data.isUserDataTaken,
        });
        localStorage.setItem("isDataTaken", response.data.isUserDataTaken);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  const chat = (event) => {
    navigate("/chat", {
      state: {
        receiver: otherUser,
        image: userData.image,
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

  const userImage = userData.image
    ? userData.image
    : `https://ui-avatars.com/api/?name=${userData.username}`;

  console.log("userData");
  console.log(userData);

  return (
    <div className="user-profile-container">
      <Navbar />
      <div className="user-profile-info">
        <div className="profile-header">
          <motion.div
            initial={{ opacity: 0, translateX: -200 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 1, ease: "linear" }}
            className="user-img"
          >
            <img src={userImage} alt="user" />
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
            <div className="findpartner-button" onClick={addInPartner}>
              {inFindPartner ? "Remove from Find Partner" : "Add to Find Partner"}
            </div>
            <motion.div
              initial={{ opacity: 0, translateX: -200 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 1, ease: "linear" }}
              className="rating-container"
            >
              <h3>Rating </h3>
              <div className="rating">
                {userData.rating === 0 ? (
                  <div className="new">new</div>
                ) : (
                  userData.rating
                )}
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
                    <i class="bx bxl-linkedin"></i>
                    <div>{userData.linkdin}</div>
                  </motion.div>
                )}
                {localStorage.getItem("username") !== otherUser && (
                  <motion.div
                    initial={{ opacity: 0, translateX: -200 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ duration: 1, ease: "linear" }}
                    className="button-div"
                  >
                    <button
                      onClick={chat}
                      datausername={otherUser}
                      className="btn"
                    >
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
                {userData.category.map((category, index) => {
                  return (
                    <div className="skill" key={index}>
                      {category}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="skills-container">
              <h1>Skills</h1>
              <div className="skills">
                {userData.skills.map((skill, index) => {
                  return (
                    <div className="skill" key={index}>
                      {skill}
                    </div>
                  );
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
