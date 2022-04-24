import React, { useState, useEffect } from "react";
import "./FindTalent.scss";
import {
  Card,
  Footer,
  Navbar,
  NormalSlider,
  SliderThreeD,
  FullScreenLoader,
} from "../../components/import";
import userImg from "../../assets/images/Cha2.jpg";
import RandomDev from "./json/RandomDev.json";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
toast.configure();

const FindTalent = () => {
  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [cardsData, setCardsData] = useState();
  const [gigs, setGigs] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/findtalent/cards`)
      .then(function (response) {
        if (cardsData === undefined) {
          setCardsData(response.data.result);
        }
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  const goToPostRequest = () => {
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
    if (isDataTaken === "true") {
      navigate("/findtalent/postwork");
    } else {
      toast.success("You must fill your details before posting the work.", {
        position: "top-center",
      });
      navigate("/userprofileinput");
    }
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
        <div className="find-talent-post-request">
          <h1>Start a bid for your project</h1>
          <div className="btn" onClick={goToPostRequest}>
            Post a Request
          </div>
          <div></div>
        </div>
        <div className="recommended-container">
          <h1>Top Gigs</h1>
          <div className="recommended-slider">
            <SliderThreeD cardsData={cardsData} type="topgigs" />
          </div>
        </div>
        <div className="recommended-container">
          <h1>New Gigs</h1>
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
