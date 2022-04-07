import React from "react";
import { Navbar } from "../../components/import";
import "./ClientProjectProgress.scss";
import clientImg from "../../assets/images/Cha2.jpg";
import { Link } from "react-router-dom";

const ClientProjectProgress = () => {
  const work = {
    title: "JavaScript Developer",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel magni dolorum, harum officiis ducimus id optio iure eius quibusdam voluptatum eligendi doloribus voluptas similique voluptatem labore. Suscipit, natus! Hic, quod.",
    skills: ["NodeJs", "HTML", "CSS", "JavaScript"],
  };
  return (
    <div className="client-project-progress">
      <Navbar />
      <div className="bid-info-container">
        <div className="client-profile">
          <div className="user-img">
            <img src={clientImg} alt="client img" />
          </div>
          <div className="title">{work.title}</div>
        </div>
        <div className="desc">{work.desc}</div>
        <h2>Skills Required</h2>
        <div className="skills">
          {work.skills.map((skill, index) => (
            <div key={index} className="skill">
              {skill}
            </div>
          ))}
        </div>
        <div className="bid-freelancer-info">
          <div className="user-img-name">
            <div className="left">
              <img src={clientImg} alt="Freelancer Img" />
              <div className="name">Noman</div>
            </div>
            <div className="status">Ongoing</div>
          </div>
          <div className="budget">
            <span>Price : </span>2000₹
          </div>
          <div className="btn-container">
            <Link to='/chat' className="chat btn">Chat</Link>
            <Link to='/userprofile' className="visit-profile btn">Visit Profile</Link>
            <div className="complete-btn btn">Complete</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProjectProgress;
