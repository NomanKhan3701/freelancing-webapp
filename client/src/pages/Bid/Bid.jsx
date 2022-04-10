import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/import";
import "./Bid.scss";
import clientImg from "../../assets/images/Cha2.jpg";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../FindWork/LoadingSpinner";
import { toast } from "react-toastify";

const Bid = () => {
  let navigate = useNavigate();
  //data passed through navigation is accessed using useLocation
  const { state } = useLocation();
  const work = state.work;
  const [isLoading, setLoading] = useState(true);
  const [comments, setComments] = useState();
  const [newComment, setNewComment] = useState("");
  const [otherBids, setOtherBids] = useState();
  const [avgBid, setAvgBid] = useState();
  const [bidInformation, setBidInformation] = useState({
    amount: "",
    desc: "",
  });

  useEffect(() => {
    //here get wasnt working with passing object so used post,
    axios
      .post(`http://localhost:8080/findwork/bid/${work.id}`, {
        id: work.id,
      })
      .then((response) => {
        setComments(response.data.items);
        setOtherBids(response.data.bids);
        setAvgBid(response.data.avgBid);
        setLoading(false);
      });
  }, []);

  const isDataTaken = localStorage.getItem("isDataTaken");
  const loggedIn = localStorage.getItem("loggedIn");

  if (loggedIn === "false") {
    toast.error("Please login to post.", {
      position: "top-center",
    });
    navigate("/login", {
      state: {
        goingTo: "/findtalent/postwork",
      },
    });
    return;
  }
  if (!isDataTaken === "true") {
    toast.success("You must fill your details before posting the work.", {
      position: "top-center",
    });
    navigate("/userprofileinput");
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const newCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const addComment = (event) => {
    const comment = newComment;
    const object = {
      workId: work.id,
      username: localStorage.getItem("username"),
      desc: comment,
    };

    if (comment.length < 20) {
      toast.error("comment length has to be atleast 20 character long.", {
        position: "top-center",
      });
      return;
    }

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

  const bidDataChange = (event) => {
    const { name, value } = event.target;
    setBidInformation((bidInformation) => {
      return {
        ...bidInformation,
        [name]: value,
      };
    });
  };

  const addNewBid = () => {
    const object = {
      ...bidInformation,
      username: localStorage.getItem("username"),
      workId: work.id,
    };
    axios
      .post("http://localhost:8080/findwork/bid/newBid", object)
      .then((response) => {
        if (response.data.result === 4) {
          //new bid added successfully
          alert("new bid added successfully.");
          navigate("/");
        } else if (response.data.result === 3) {
          alert("only one bid per user.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const visitProfile = () => {
    navigate(`/userprofile`, {
      state: {
        username: work.username,
      },
    });
  };

  return (
    <div className="bid">
      <Navbar />
      <div className="bid-left">
        <div className="bid-info-container">
          <div className="client-profile">
            <div className="user-img">
              <img src={clientImg} alt="client img" />
            </div>
            <div className="title">{work.title}</div>
            {/* <div className="btn" onClick={visitProfile}>
              Visit Profile
            </div> */}
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
          <div className="form">
            <div className="price">
              <input
                type="text"
                name="amount"
                placeholder="Your Bid In Rupees..."
                value={bidInformation.amount}
                onChange={bidDataChange}
              />
            </div>
            <div className="desc">
              <textarea
                name="desc"
                placeholder="description in more than 100 characters"
                value={bidInformation.desc}
                onChange={bidDataChange}
              />
            </div>
            <input type="file" id="myFile" name="filename"></input>
            <div className="btn" onClick={addNewBid}>
              Bid Now
            </div>
          </div>
        </div>
        <div className="comments-container">
          <div className="title">Comments</div>

          <div className="form">
            <div className="user-img">
              <img src={clientImg} alt="" />
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
                    <img src={clientImg} alt="user img" />
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
            "No Bids yet"
          ) : (
            <div>
              <div className="title">
                {otherBids.length} freelancer are bidding on an average of{" "}
                {avgBid}₹
              </div>
              <div className="freelancers">
                {otherBids.map((bid) => {
                  return (
                    <div key={bid._id} className="freelancer">
                      <div className="user-info">
                        <img src={clientImg} alt="user image" />
                        <div className="user-name">{bid.username}</div>
                      </div>
                      <div className="flex">
                        <div className="price">Price : {bid.amount}₹</div>
                        <div className="star">Rating : 4.9</div>
                      </div>
                      <div className="desc">{bid.desc}</div>
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

export default Bid;
