import React from "react";
import { useNavigate } from "react-router";
import "./card.scss";

const Card = (props) => {
  const navigate = useNavigate();
  const gigSelected = (username) => {
    console.log(username);
    //left work to do, getting the user id, then going to user profile or dashboard
    navigate("/userprofile", {
      state: {
        username: username,
      },
    });
  };
  return (
    <div className="card">
      <div className="header-img">
        <img src={props.headerImg} alt="header img" />
      </div>
      <div className="user-img">
        <img src={props.userImg} alt="user img" />
      </div>
      <div className="user-info">
        <h2 className="title">
          <a href="#">{props.name}</a>
        </h2>
        <div className="desc">{props.desc}</div>
      </div>
      {props.rating && props.rating != 0 ? (
        <div className="card-mid">
          <div className="rating-container">
            <i className="bx bxs-star"></i>
            <span className="rating">{props.rating}</span>
          </div>
          <div
            className="follow"
            onClick={() => {
              gigSelected(props.username);
            }}
          >
            <i className="bx bxs-user-plus"></i>
            <span>Profile</span>
          </div>
        </div>
      ) : (
        <div className="card-mid-new">
          <div className="new-freelancer">New Freelancer</div>
          <div
            className="follow"
            onClick={() => {
              gigSelected(props.username);
            }}
          >
            <i className="bx bxs-user-plus"></i>
            <span>Profile</span>
          </div>
        </div>
      )}
      <div className="card-footer">
        <div className="price-container">
          <div className="price">
            <a href="#">STARTING AT ₹{props.startPrice}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
