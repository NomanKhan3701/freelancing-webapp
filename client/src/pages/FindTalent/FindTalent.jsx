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
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
import { useNavigate } from "react-router";

>>>>>>> 0862749b805008c4d2e8a1a0dc532bc4c42b4527
import { toast } from "react-toastify";
toast.configure();

const FindTalent = () => {
<<<<<<< HEAD
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
=======
  let navigate = useNavigate();
  const goToPostRequest = () => {
    const isDataTaken = localStorage.getItem("isDataTaken");
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "false") {
      toast.error("Please login to post.", {
        position: "top-center",
      });
      navigate("/login");
      return;
    }
    if (!isDataTaken) {
      navigate("/findtalent/postwork");
    } else {
      toast.error("You must fill your details before posting the work.", {
        position: "top-center",
      });
      navigate("/userprofileinput");
    }
>>>>>>> 0862749b805008c4d2e8a1a0dc532bc4c42b4527
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
<<<<<<< HEAD
          <div className="btn" onClick={validator}>
            Post Work
=======
          <div className="btn" onClick={goToPostRequest}>
            Post a Request
>>>>>>> 0862749b805008c4d2e8a1a0dc532bc4c42b4527
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
