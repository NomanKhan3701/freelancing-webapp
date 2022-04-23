import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Navbar } from "../../components/import";
import "./WebsiteFeedback.scss";

toast.configure();

const WebsiteFeedback = () => {
  const [websiteFeedback, setWebsiteFeedback] = useState({});
  const navigate = useNavigate();
  if (localStorage.getItem("username") === "undefined") {
    toast.error("you need to login first...", {
      position: "top-center",
    });
    navigate("/login");
    return "";
  }
  const feedbacks = [
    {
      votes: 4,
      title: "Dark Mode",
      description:
        "Please release a dark mode MongoDB Atlas interface. Thank you.",
    },
    {
      votes: 4,
      title: "Dark Mode",
      description:
        "Please release a dark mode MongoDB Atlas interface. Thank you.",
    },
  ];

  const changeFeedback = (event) => {
    const { name, value } = event.target;
    setWebsiteFeedback((data) => {
      return { ...data, [name]: value };
    });
  };

  const onSubmit = (event) => {
    if (!websiteFeedback.title || websiteFeedback.title.length < 15) {
      toast.error("Title has to be atleast 15 character long...", {
        position: "top-center",
      });
    }
    if (!websiteFeedback.desc || websiteFeedback.desc.length < 30) {
      toast.error("Description has to be atleast 30 character long...", {
        position: "top-center",
      });
    }
    setWebsiteFeedback({
      title: "",
      desc: "",
    });
    axios
      .post("http://localhost:8080/websitefeedback", {
        data: {
          ...websiteFeedback,
          username: localStorage.getItem("username"),
          image: localStorage.getItem("image"),
        },
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="feedback-base-container">
        <Navbar />
        <div className="desc-container">
          <div className="feedback-input">
            <div className="title">
              How can we Make this website better for you?
            </div>
            <div className="desc">
              <ol>
                <li>A brief description of what you are looking to do</li>
                <li>How you think this will help</li>
                <li>Why this matters to you</li>
              </ol>
            </div>
            <input
              type="text"
              placeholder="Title regarding feedback"
              className="input"
              name="title"
              value={websiteFeedback.title}
              id="title"
              onChange={changeFeedback}
            />
            <textarea
              name="desc"
              id="desc"
              cols="1"
              rows="10"
              className="input"
              value={websiteFeedback.desc}
              typeof="text"
              placeholder="your feedback to us ..."
              onChange={changeFeedback}
            ></textarea>
          </div>

          <div className="desc">
            <div className="desc-title" onClick={onSubmit}>
              Share your idea.
            </div>
          </div>
        </div>
        <div className="feedback-container">
          {feedbacks.map((elem, index) => {
            return (
              <div className="each-feedback-container" key={index}>
                <div className="votes">
                  <div className="number">{elem.votes}</div>
                  <div className="vote-button">VOTE</div>
                </div>
                <div className="feedback-titleanddesc">
                  <div className="feedback-title">{elem.title}</div>
                  <div className="feedback-desc">{elem.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default WebsiteFeedback;
