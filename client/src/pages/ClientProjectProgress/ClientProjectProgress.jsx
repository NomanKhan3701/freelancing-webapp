import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/import";
import "./ClientProjectProgress.scss";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

const ClientProjectProgress = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [freelancerImage, setFreelancerImage] = useState(null);
  const workData = state.work;
  const clientImage = `https://ui-avatars.com/api/?name=${workData.freelancer}`;
  const goToUserProfile = () => {
    navigate("/userprofile", {
      state: {
        username: state.work.freelancer,
      },
    });
  };
  const goToChat = () => {
    navigate("/chat", {
      state: {
        receiver: state.work.freelancer,
      },
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getImage/${workData.freelancer}`)
      .then((response) => {
        setFreelancerImage(response.data.image);
      });
  }, []);

  const complete = (workId, freelancer, title) => {
    const userReply = prompt("Are you sure (yes/no):");
    if (userReply.toLocaleLowerCase() === "yes") {
      navigate("/feedback", {
        state: {
          workId: workId,
          freelancer: freelancer,
          title: title,
        },
      });
    }
  };
  return (
    <div className="client-project-progress">
      <Navbar />
      <div className="bid-info-container">
        <div className="client-profile">
          <div className="user-img">
            <img src={workData.image} alt="client" />
          </div>
          <div className="title">{workData.title}</div>
        </div>
        <div className="desc">{workData.desc}</div>
        <h2>Skills Required</h2>
        <div className="skills">
          {workData.qualifications.map((skill, index) => (
            <div key={index} className="skill">
              {skill}
            </div>
          ))}
        </div>
        <div className="bid-freelancer-info">
          <div className="user-img-name">
            <div className="left">
              <img
                src={freelancerImage !== "" ? freelancerImage : clientImage}
                alt="Freelancer"
              />
              <div className="name">{workData.freelancer}</div>
            </div>
            <div className="status">{workData.progress}</div>
          </div>
          <div className="budget">
            <span>Price : </span>2000₹
          </div>
          <div className="btn-container">
            <div className="chat btn" onClick={goToChat}>
              Chat
            </div>
            <div className="visit-profile btn" onClick={goToUserProfile}>
              Visit Profile
            </div>
            {workData.progress !== "completed" && (
              <div
                className="complete-btn btn"
                onClick={() => {
                  complete(
                    workData.workId,
                    workData.freelancer,
                    workData.title
                  );
                }}
              >
                Complete
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProjectProgress;
