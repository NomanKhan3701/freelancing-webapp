import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/import";
import "./ClientDashboard.scss";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../FindWork/LoadingSpinner";
import { toast } from "react-toastify";
toast.configure();

const ClientDashboard = () => {
  let navigate = useNavigate();
  //data passed through navigation is accessed using useLocation
  const { state } = useLocation();
  let senderImage = localStorage.getItem("image");
  if (!senderImage) {
    senderImage = `https://ui-avatars.com/api/?name=${localStorage.getItem(
      "username"
    )}`;
  }

  let work = state.work;
  console.log("work");
  console.log(work);
  if (Array.isArray(work)) {
    work = work[0];
  }
  const [isLoading, setLoading] = useState(true);
  const [comments, setComments] = useState();
  const [newComment, setNewComment] = useState("");
  const [otherBids, setOtherBids] = useState();
  const [avgBid, setAvgBid] = useState();

  useEffect(() => {
    //here get wasnt working with passing object so used post,
    axios
      .post(`http://localhost:8080/findwork/bid/${work._id}`)
      .then(function (response) {
        setComments(response.data.items);
        setOtherBids(response.data.bids);
        setAvgBid(response.data.avgBid);
        setLoading(false);
      });
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const newCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const addComment = (event) => {
    if (newComment.length < 20) {
      toast.error("comment length has to be greater than 20 characters.", {
        position: "top-left",
      });
      return;
    }
    const comment = newComment;
    const object = {
      workId: work._id,
      username: localStorage.getItem("username"),
      desc: comment,
      image: senderImage,
    };
    setNewComment("");

    axios
      .post("http://localhost:8080/findwork/bid/newComment", object)
      .then((response) => {
        if (response.data.result === 4) {
          setComments((comments) => {
            return [...comments, object];
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const visitUserProfile = (username) => {
    navigate("/userprofile/", {
      state: {
        username: username,
      },
    });
  };

  const acceptBid = (username) => {
    const userAns = prompt("are u sure ?(yes/no)");
    if (userAns.toLowerCase() === "yes") {
      axios
        .post("http://localhost:8080/acceptbid", {
          workId: work._id,
          freelancer: username,
        })
        .then((response) => {
          toast.success("I m in.", {
            position: "top-center",
          });
          if (response.data.result === 4) {
            toast.success("Bid accepted successfully.", {
              position: "top-center",
            });
            navigate("/clientprojectprogress", {
              state: {
                work: work,
              },
            });
          } else {
            toast.success("error in updating the data..", {
              position: "top-center",
            });
          }
        });
    }
  };

  return (
    <div className="client-dashboard">
      <Navbar />
      <div className="bid-left">
        <div className="bid-info-container">
          <div className="client-profile">
            <div className="user-img">
              <img src={senderImage} alt="client img" />
            </div>
            <div className="title">{work.title}</div>
          </div>

          <div className="desc">{work.desc}</div>
          <h2>Skills Required</h2>
          <div className="skills">
            {work.qualifications.map((skill, index) => (
              <div key={index} className="skill">
                {skill}
              </div>
            ))}
          </div>
          <div className="work-image">
            <embed
              src={work.workImage}
              type="application/pdf"
              width="100%"
            ></embed>
          </div>
        </div>
        <div className="comments-container">
          <div className="title">Comments</div>

          <div className="form">
            <div className="user-img">
              <img src={senderImage} alt="" />
            </div>
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={newCommentChange}
            />
            <div className="btn" onClick={addComment}>
              Comment
            </div>
          </div>

          <div className="comments">
            {comments.map((comment) => {
              return (
                <div className="comment">
                  <div className="user-profile">
                    <img
                      src={
                        comment.image ||
                        `https://ui-avatars.com/api/?name=${comment.username}`
                      }
                      alt="user img"
                    />
                    <div className="info">
                      <div className="user-name">{comment.username}</div>
                      <div className="comment-desc">{comment.desc}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="bid-right">
        <div className="people-bid-info">
          {otherBids.length === 0 ? (
            "No Bids Posted."
          ) : (
            <div>
              <div className="title">
                {otherBids.length} freelancer is/are bidding on an average of{" "}
                {avgBid}₹
              </div>
              <div className="freelancers">
                {otherBids.map((bid) => {
                  return (
                    <div key={bid._id} className="freelancer">
                      <div className="freelancer-bid-top">
                        <div className="user-info">
                          <img src={bid.image} alt="user" />
                          <div className="user-name">{bid.username}</div>
                        </div>
                        <div className="flex sell-bid-info">
                          <div className="price sell-info">
                            Price : {bid.amount}₹
                          </div>
                          <div className="star sell-info">Rating : 4.9</div>
                        </div>
                        <div className="desc">{bid.desc}</div>
                      </div>
                      <div className="freelancer-bid-bottom">
                        <div
                          className="btn"
                          onClick={() => {
                            visitUserProfile(bid.username);
                          }}
                        >
                          Visit profile
                        </div>
                        <div
                          className="btn"
                          onClick={() => {
                            acceptBid(bid.username);
                          }}
                        >
                          Accept Bid
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
