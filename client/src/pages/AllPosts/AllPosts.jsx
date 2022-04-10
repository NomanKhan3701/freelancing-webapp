import React from "react";
import { useLocation, useNavigate } from "react-router";
import { Footer, Navbar } from "../../components/import";
import "./AllPosts.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AllPosts = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const viewBids = (workId) => {
    axios
      .get(`http://localhost:8080/findworkdata/${workId}`)
      .then((response) => {
        if (response) {
          navigate("/clientdashboard", {
            state: {
              work: response.data.result,
            },
          });
        } else {
          toast.configure("error in routing to client dashboard.", {
            position: "top-center",
          });
        }
      });
  };
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
                    <div className="btn-container">
                      {work.username !== localStorage.getItem("username") && (
                        <div className="btn">Chat</div>
                      )}
                      <div className="status progress">{work.progress}</div>
                      {work.progress === "not started" &&
                        work.username === localStorage.getItem("username") && (
                          <div
                            className="btn"
                            onClick={() => {
                              viewBids(work._id);
                            }}
                          >
                            View Bids
                          </div>
                        )}
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

export default AllPosts;
