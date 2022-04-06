import React from "react";
import "./FindTalent.scss";
import {
  Card,
  Footer,
  Navbar,
  NormalSlider,
  SliderThreeD,
} from "../../components/import";
import userImg from "../../assets/images/Cha2.jpg";
import RandomDev from "./json/RandomDev.json";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
toast.configure();

const FindTalent = () => {
  const navigate = useNavigate();
  const validator = () => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn === "false") {
      toast.error("please login before posting any work.", {
        position: "top-center",
      });
      navigate("/login", { state: { goingTo: "/findtalent" } });
      return;
    }

    const isDataTaken = localStorage.getItem("isDataTaken");
    if (isDataTaken === "false") {
      toast.error("please fill this data before posting work.", {
        position: "top-center",
      });
      navigate("/userprofileinput", { state: { goingTo: "/findtalent" } });
      return;
    }
    navigate("/findtalent/postwork");
  };

  return (
    <>
      <div className="find-talent-container">
        <Navbar />
        <div className="categories-container">
          <h1>Categories</h1>
          <div className="categories-slider">
            <NormalSlider type="findtalent" />
          </div>
        </div>
        <div className="post-request">
          <h1>Start a bid for your project</h1>
          <div className="btn" onClick={validator}>
            Post Work
          </div>
        </div>
        <div className="recommended-container">
          <h1>Recommended gigs</h1>
          <div className="recommended-slider">
            <SliderThreeD />
          </div>
        </div>
        <div className="random-container">
          <h1>Gigs you may like</h1>
          <div className="random-card-container">
            {RandomDev.map((card, index) => (
              <Card
                key={index}
                headerImg="https://www.templarbit.com/images/blog/templarbit-illustration-csp-header-92837bc0.jpg"
                userImg={userImg}
                name={card.name}
                desc={card.desc}
                rating={card.rating}
                startPrice={card.startPrice}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FindTalent;
