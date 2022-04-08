import React from "react";
import { useLocation } from "react-router";
import { Footer, Navbar } from "../../components/import";
import "./AllPosts.scss";
import { Link } from "react-router-dom";

const AllPosts = (props) => {
  const { state } = useLocation();
  return (
    <>
      <div className="all-posts-container">
        <Navbar />
        <h1>All Posts</h1>
        <div className="post-cards">
          {state.workPosted.length === 0
            ? "No Work Posted"
            : state.workPosted.map((work) => {
                return (
                  <div className="post-card">
                    <h1 className="title">{work.title}</h1>
                    <div className="desc">{work.desc}</div>
                    <div className="status progress">{work.progress}</div>
                  </div>
                );
              })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllPosts;
