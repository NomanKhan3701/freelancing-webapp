import React, {useState, useEffect} from "react";
import { Navbar } from "../../components/import";
import "./Bid.scss";
import clientImg from "../../assets/images/Cha2.jpg";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../FindWork/LoadingSpinner";



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

  useEffect(() => {
    //here get wasnt working with passing object so used post,
    axios.post(`http://localhost:8080/findwork/bid`,{
      id: work.id
    })
    .then(function (response) {
      setComments(response.data.items);
      setOtherBids(response.data.bids);
      setAvgBid(response.data.avgBid);
      setLoading(false);

    })
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const newCommentChange = (event) => {
    setNewComment(event.target.value);
  }

  const addComment = (event) => {
    const comment = newComment;
    const object = {
      workId: work.id,
      username: localStorage.getItem('username'),
      desc: comment,
    };
    setNewComment("");
    axios.post("http://localhost:8080/findwork/bid/newComment", object)
      .then((response) => {
        if(response.data.result === 4){
          setComments((comments) => {
            return [...comments, object];
          })
        }
      }).catch((err) => {
        console.log(err);
      })
  } 

  return (
    <div className = "bid">
      <Navbar />
      <div className = "bid-left">
        <div className = "bid-info-container">
          <div className = "client-profile">
            <div className = "user-img">
              <img src = {clientImg} alt = "client img" />
            </div>
            <div className = "title">{work.title}</div>
          </div>

          <div className = "desc">{work.desc}</div>
          <h2>Skills Required</h2>
          <div className = "skills">
            {work.skills.map((skill, index) => (
              <div key = {index} className = "skill">
                {skill}
              </div>
            ))}
          </div>
          <div className = "form">
            <div className = "price">
              <input type = "text" placeholder = "Your Bid In Rupees..." />
            </div>
            <div className = "btn">Bid Now</div>
          </div>
        </div>
        <div className = "comments-container">
          <div className = "title">Comments</div>
          
          <div className = "form">
            <div className = "user-img">
              <img src = {clientImg} alt="" />
            </div>
            <input type = "text" placeholder = "Add a comment..." value = {newComment} onChange = {newCommentChange}/>
            <div className = "btn" onClick = {addComment}>Comment</div>
          </div>

          <div className = "comments">
          {comments.map((comment) => {
           return <div className = "comment">
              <div className = "user-profile">
                <img src = {clientImg} alt = "user img" />
                <div className = "info">
                  <div className = "user-name">{comment.username}</div>
                  <div className = "comment-desc">
                    {comment.desc}
                  </div>
                </div>
              </div>
            </div>
          })}
          </div>
        </div>
      </div>
      <div className = "bid-right">
        <div className = "people-bid-info">
          <div className = "title">
            {otherBids.length} freelancer are bidding on an average of {avgBid}₹
          </div>
          <div className = "freelancers">
            {otherBids.map((bid) => {
              return (
                <div key = {bid._id} className = "freelancer" >
                  <div className = "user-info">
                    <img src = {clientImg} alt = "user image" />
                    <div className = "user-name">{bid.username}</div>
                  </div>
                  <div className = "flex">
                    <div className = "price">Price : {bid.amount}₹</div>
                    <div className = "star">Rating : 4.9</div>
                  </div>
                  <div className = "desc">
                    {bid.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bid;
