import React from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { Footer, Navbar } from "../../components/import";
import "./AllWorks.scss";
import { Link } from "react-router-dom";

const AllWorks = () => {
  const { state } = useLocation();
  return (
    <>
      <div className="all-works-container">
        <Navbar />
        <h1>All works</h1>
        <div className="work-cards">
          {state.freelancingWork.length === 0 ? (
            <div className="no-works">No works</div>
          ) : state.freelancingWork.map((work) => {
            return(
            <div className="work-card">
              <h1 className="title">{work.title}</h1>
              <div className="desc">
                {work.desc}
              </div>
              <div className={work.progress==="Completed" ? "status progress":"status done"}>{work.progress}</div>
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
