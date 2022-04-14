import React from "react";
import { useLocation } from "react-router";
import { Footer, Navbar } from "../../components/import";
import "./AllWorks.scss";
import { Link } from "react-router-dom";

const AllWorks = (props) => {
  const { state } = useLocation();
  console.log(state);
  return (
    <>
      <div className="all-works-container">
        <Navbar />
        <h1>All Posts</h1>
        <div className="work-cards">
          {state.freelancingWork.length === 0
            ? "No Work Posted"
            : state.freelancingWork.map((work) => {
                return (
                  <div className="work-card">
                    <h1 className="title">{work.title}</h1>
                    <div className="desc">{work.desc}</div>
                    <div className="btn-container">
                      {work.username !== localStorage.getItem("username") && (
                        <div className="btn">Chat</div>
                      )}
                      <div className="status progress">{work.progress}</div>
                      {work.username !== localStorage.getItem("username") && (
                        <div className="btn">Visit Profile</div>
                      )}
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllWorks;
