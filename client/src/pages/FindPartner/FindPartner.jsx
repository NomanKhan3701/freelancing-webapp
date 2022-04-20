import React from "react";
import { FindPartnerPagination, Navbar, Footer } from "../../components/import";
import userImg from "../../assets/images/Cha2.jpg";
import "./FindPartner.scss";

const FindPartner = () => {
  const partners = [
    {
      name: "Noman",
      img: { userImg },
      skills: ["HTML", "CSS", "JavaScript", "NodeJs"],
      categories: ["Frontend Developer", "Backend Developer"],
    },
    {
      name: "Noman2",
      img: { userImg },
      skills: ["HTML", "CSS", "JavaScript", "NodeJs"],
      categories: ["Frontend Developer", "Backend Developer"],
    },
    {
      name: "Noman3",
      img: { userImg },
      skills: ["HTML", "CSS", "JavaScript", "NodeJs"],
      categories: ["Frontend Developer", "Backend Developer"],
    },
    {
      name: "Noman4",
      img: { userImg },
      skills: ["HTML", "CSS", "JavaScript", "NodeJs"],
      categories: ["Frontend Developer", "Backend Developer"],
    },
    {
      name: "Noman5",
      img: { userImg },
      skills: ["HTML", "CSS", "JavaScript", "NodeJs"],
      categories: ["Frontend Developer", "Backend Developer"],
    },
    {
      name: "Noman6",
      img: { userImg },
      skills: ["HTML", "CSS", "JavaScript", "NodeJs"],
      categories: ["Frontend Developer", "Backend Developer"],
    },
  ];

  const skills = ["HTML", "CSS", "JavaScript", "NodeJs", "MongoDB", "ReactJS"];

  const renderPartnerBody = (partner, index) => {
    return (
      <div className="partner" key={index}>
        <div className="top">
          <img src={userImg} alt="userImg" />
          <div className="user-name">{partner.name}</div>
        </div>
        <div className="bottom">
          <div className="categories">
            <h2>Category : </h2>
            {partner.categories.map((category, idx) => (
              <div className="category" index={idx}>
                {category}
              </div>
            ))}
          </div>
          <div className="skills">
            <h2>Skills : </h2>
            {partner.skills.map((skill, idx) => (
              <div className="skill" index={idx}>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="find-partner">
        <Navbar />
        <div className="find-partner-filter">
          <div className="categories">
            <h2>Category</h2>
            <select name="category" id="">
              <option>Frontend web</option>
              <option>Backend web</option>
              <option>Logo Creator</option>
              <option>App developer</option>
            </select>
          </div>
          <div className="checkbox-container">
            <h2>Skills</h2>
            {skills.map((skill, index) => (
              <div key={index} className="checkbox">
                <input type="checkbox" id={`skill-checkbox-${index}`} />
                <label htmlFor={`skill-checkbox-${index}`}>{skill}</label>
              </div>
            ))}
          </div>
          <div className="similar-skills">
            <h2 className="toggle-content">Use Github</h2>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <div className="partner-main-body">
          <FindPartnerPagination
            limit="4"
            bodyData={partners}
            renderBody={(item, index) => renderPartnerBody(item, index)}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FindPartner;
