import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Footer, FullScreenLoader, LimitCharHoverReveal, Navbar } from "../../components/import";
import "./AllPosts.scss";
import axios from "axios";
import { toast } from "react-toastify";
// import LoadingSpinner from "../Chat/LoadingSpinner";
const server_url = process.env.REACT_APP_server_url;

toast.configure();

const AllPosts = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!("username" in state)) {
      setLoading(false);
    }
    if ("username" in state) {
      axios
        .get(
          `${server_url}/userprofile/allpost/${localStorage.getItem(
            "username"
          )}`
        )
        .then((response) => {
          state.workPosted = response.data.workPosted;
          setLoading(false);
        });
    }
  }, [state]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  const viewBids = (workId) => {
    axios
      .get(`${server_url}/findworkdata/${workId}`)
      .then((response) => {
        if (response) {
          navigate("/clientdashboard", {
            state: {
              work: response.data.result,
            },
          });
        } else {
          toast.error("error in routing to client dashboard.", {
            position: "top-center",
          });
        }
      });
  };

  const seeDetails = (index) => {
    //here work datas are comign from two schemas findwork and
    // workinprogress and in findwork id == workid but
    // in work in progress schema id != workid we have special field workId creayed for it
    const data = state.workPosted[index];
    navigate("/clientprojectprogress", {
      state: {
        work: data,
      },
    });
  };

  const visitProfile = (username) => {
    navigate("/userprofile", {
      state: {
        username: username,
      },
    });
  };
  return (
    <div className="all-post-adjust-footer">
      <div className="all-posts-container">
        <Navbar />
        <h1>Works Posted</h1>
        <div className="post-cards">
          {state.workPosted.length === 0 ? (
            <div className="no-posts">You haven't posted any work yet.</div>
          ) : (
            state.workPosted.map((work, index) => {
              return (
                <div className="post-card">
                  <h1 className="title">
                    <LimitCharHoverReveal word={work.title} limit="23" />
                  </h1>
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
                    {work.progress === "in progress" &&
                      work.username === localStorage.getItem("username") && (
                        <div
                          className="btn"
                          onClick={() => {
                            seeDetails(index);
                          }}
                        >
                          see details
                        </div>
                      )}
                    {work.progress === "completed" &&
                      work.username === localStorage.getItem("username") && (
                        <div
                          className="btn"
                          onClick={() => {
                            seeDetails(index);
                          }}
                        >
                          see details
                        </div>
                      )}
                    {work.username !== localStorage.getItem("username") && (
                      <div
                        className="btn"
                        onClick={() => {
                          visitProfile(work.username);
                        }}
                      >
                        Visit Profile
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllPosts;
