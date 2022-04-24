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
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
toast.configure();

const FindTalent = () => {
  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [cardsData, setCardsData] = useState();
  const [randomGigs, setRandomGigs] = useState([]);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  useEffect(() => {
    axios
      .get(`http://localhost:8080/findtalent/cards`)
      .then(function (response) {
        if (cardsData === undefined) {
          setCardsData(response.data.result);
          setRandomGigs((randomGigs)=> shuffle(response.data.result));
          setRandomGigs((randomGigs)=> randomGigs.slice(0, 10));
          console.log("randomGigs");
          console.log(randomGigs);
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
            <SliderThreeD cardsData={cardsData} type="newgigs" />
          </div>
        </div>
        <div className="random-container">
          <h1>Gigs you may like</h1>
          <div className="random-card-container">
            {randomGigs.map((card, index) => {
              return (
                <Card
                  key={index}
                  headerImg="https://www.templarbit.com/images/blog/templarbit-illustration-csp-header-92837bc0.jpg"
                  userImg={userImg}
                  username={card.username}
                  desc={card.desc}
                  rating={card.rating}
                  startPrice={card.price}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FindTalent;
