import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Footer, LimitCharHoverReveal, Navbar } from "../../components/import";
import "./AllWorks.scss";
import axios from "axios";
import LoadingSpinner from "../Chat/LoadingSpinner";

const AllWorks = (props) => {
  const { state } = useLocation();
  const [isLoading, setLoading] = useState(true);
  if (!("username" in state)) {
    setLoading(false);
  }
  useEffect(() => {
    if ("username" in state) {
      axios
        .get(
          `http://localhost:8080/userprofile/allwork/${localStorage.getItem(
            "username"
          )}`
        )
        .then((response) => {
          state.freelancingWork = response.data.freelancingWork;
          setLoading(false);
        });
    }
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
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
                    <h1 className="title"><LimitCharHoverReveal word={work.title} limit="23"/></h1>
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
