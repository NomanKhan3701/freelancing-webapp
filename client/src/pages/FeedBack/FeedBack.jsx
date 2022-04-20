import { useState } from "react";
import "./FeedBack.scss";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";

const colours = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const FeedBack = () => {
  const [rating, setRating] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);
  const [feedbackDesc, setFeedbackDesc] = useState();
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleClick = (value) => {
    setRating(value);
  };

  const updateFeedback = (event) => {
    setFeedbackDesc(event.target.value);
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = (value) => {
    setHoverValue(undefined);
  };

  const submitFeedback = () => {
    if (feedbackDesc.length < 21) {
      toast.error("Feedback has to be atleast 20 character long.", {
        position: "top-center",
      });
      return;
    }
    if ("freelancer" in state) {
      axios.post(`http://localhost:8080/feedback`, {
        workId: state.workId,
        client: localStorage.getItem("username"),
        rating: rating,
        feedback: feedbackDesc,
        freelancer: state.freelancer,
        title: state.title,
      });
    } else {
      axios.post(`http://localhost:8080/feedback`, {
        workId: state.workId,
        rating: rating,
        feedback: feedbackDesc,
      });
    }
    toast.success("Feedback added successfully.", {
      position: "top-center",
    });
    navigate("/");
  };

  return (
    <div className="container">
      <div className="form">
        <div className="title">FeedBack for the Freelancer.</div>
        <div className="stars">
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={36}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={() => handleMouseLeave(index + 1)}
                color={
                  (hoverValue || rating) > index ? colours.orange : colours.grey
                }
              ></FaStar>
            );
          })}
        </div>
        <div className="desc">
          <textarea
            name="feedback"
            id="feedback"
            cols="50"
            rows="10"
            placeholder={`Enter the feedback for the ${
              localStorage.getItem("username") === state.client
                ? "freelancer"
                : "client "
            } here:`}
            value={feedbackDesc}
            onChange={updateFeedback}
          ></textarea>
        </div>
        <div className="btn" onClick={submitFeedback}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default FeedBack;
