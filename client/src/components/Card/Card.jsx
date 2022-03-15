import React from "react";
import "./card.scss";

const Card = (props) => {
  return (
    <div className="card">
      <div className="header-img">
        <img
          src={props.headerImg}
          alt="header img"
        />
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
      {props.rating ? (
        <div className="card-mid">
          <div className="rating-container">
            <i className="bx bxs-star"></i>
            <span className="rating">{props.rating}</span>
          </div>
          <div className="follow">
            <i className="bx bxs-user-plus"></i>
            <span>Follow</span>
          </div>
        </div>
      ) : (
        <div className="card-mid-new">
          <div className="new-freelancer">New Freelancer</div>
          <div className="follow">
            <i className="bx bxs-user-plus"></i>
            <span>Follow</span>
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
