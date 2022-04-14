import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/import";
import "./Bid.scss";
import clientImg from "../../assets/images/Cha2.jpg";
import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../FindWork/LoadingSpinner";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectImageData } from "../../features/images/imageSlice";

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

  let image = useSelector(selectImageData);
  try {
    image = image.image.image;
  } catch (error) {
    image = `https://ui-avatars.com/api/?name=${localStorage.getItem(
      "username"
    )}`;
  }

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
  }, []);

  const isDataTaken = localStorage.getItem("isDataTaken");
  const loggedIn = localStorage.getItem("loggedIn");

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const newCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const addComment = (event) => {
    const comment = newComment;
    const object = {
      image: image,
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
    const amount = bidInformation.amount;
    if (!parseInt(amount)) {
      toast.error("Invalid Input, Amount.", {
        position: "top-center",
      });
      return;
    }
    const object = {
      ...bidInformation,
      username: localStorage.getItem("username"),
      workId: work.id,
      image: image,
    };
    setLoading(true);
    axios
      .post("http://localhost:8080/findwork/bid/newBid", object)
      .then((response) => {
        setLoading(false);
        if (response.data.result === 4) {
          //new bid added successfully
          toast.success("new bid added successfully.", {
            position: "top-center",
          });
          setOtherBids((prevData) => {
            return [...prevData, object];
          });
          navigate("/");
        } else if (response.data.result === 3) {
          toast.error("only one bid per user.", {
            position: "top-center",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bid">
      <Navbar />
      <div className="bid-left">
        <div className="bid-info-container">
          <div className="client-profile">
            <div className="user-img">
              <Link to={`/userprofile/${work.username}`}>
                <img src={work.image} alt="client img" />
              </Link>
            </div>
            <div className="title">{work.title}</div>
            <div className="btn">
              <Link to={`/userprofile/${work.username}`}>{work.username}</Link>
            </div>
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
              <img src={image} alt="User Image" />
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
                    <Link to={`/userprofile/${comment.username}`}>
                      <img
                        src={
                          comment.image ||
                          `https://ui-avatars.com/api/?name=${comment.username}`
                        }
                        alt="user img"
                      />
                    </Link>
                    <div className="info">
                      <div className="user-name">
                        <Link to={`/userprofile/${comment.username}`}>
                          {comment.username}
                        </Link>
                      </div>
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
                        <Link to={`/userprofile/${bid.username}`}>
                          <img
                            src={
                              bid.image ||
                              `https://ui-avatars.com/api/?name=${bid.username}`
                            }
                            alt="user image"
                          />
                        </Link>
                        <div className="user-name">
                          <Link to={`/userprofile/${bid.username}`}>
                            {bid.username}
                          </Link>
                        </div>
                      </div>
                      <div className="flex btn-center">
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
