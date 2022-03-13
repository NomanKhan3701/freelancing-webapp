import React from "react";
import "./FindTalent.scss";
import { Card, Navbar } from "../../components/import";
import userImg from "../../assets/images/Cha2.jpg";
import Categories from "./json/Categories.json";
import Recommended from "./json/Recommended.json";
import RandomDev from "./json/RandomDev.json";

const FindTalent = () => {
  return (
    <div className="find-talent-container">
      <Navbar />
      <div className="categories-container">
        <div className="categories-slider">
          
        </div>
      </div>
      <div className="recommended-container">
        <h1>Recommended gigs</h1>
        <div className="recommended-slider">

        </div>
      </div>
      <div className="random-container">
        <h1>Gigs you may like</h1>
        <div className="random-card-container">
          {RandomDev.map((card, index) => (
            <Card 
              key={index}
              headerImg = "https://www.templarbit.com/images/blog/templarbit-illustration-csp-header-92837bc0.jpg"
              userImg = {userImg}
              name = {card.name}
              desc = {card.desc}
              rating = {card.rating}
              startPrice= {card.startPrice}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindTalent;
