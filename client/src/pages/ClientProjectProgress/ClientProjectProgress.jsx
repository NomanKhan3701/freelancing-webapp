import React from "react";
import { Navbar } from "../../components/import";
import "./ClientProjectProgress.scss";
import clientImg from "../../assets/images/Cha2.jpg";
import { useLocation, useNavigate } from "react-router";

const ClientProjectProgress = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const workData = state.work;
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
  return (
    <div className="client-project-progress">
      <Navbar />
      <div className="bid-info-container">
        <div className="client-profile">
          <div className="user-img">
            <img src={clientImg} alt="client img" />
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
              <img src={clientImg} alt="Freelancer Img" />
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
            <div className="complete-btn btn">Complete</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProjectProgress;
