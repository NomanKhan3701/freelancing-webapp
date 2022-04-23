import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FullScreenLoader, Navbar } from "../../components/import";
import "./WebsiteFeedback.scss";

toast.configure();

const WebsiteFeedback = () => {
  const [websiteFeedback, setWebsiteFeedback] = useState({});
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [otherFeedbacks, setOtherFeedbacks] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/websitefeedback`)
      .then(function (response) {
        console.log("response.data.result");
        console.log(response.data.result);
        setOtherFeedbacks(response.data.result);
        setLoading(false);
      });
  }, []);

  if (localStorage.getItem("username") === "undefined") {
    toast.error("you need to login first...", {
      position: "top-center",
    });
    navigate("/login");
    return "";
  }

  if (isLoading) {
    return <FullScreenLoader />;
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
    setLoading(true);
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

    axios
      .post("http://localhost:8080/websitefeedback", {
        data: {
          ...websiteFeedback,
          username: localStorage.getItem("username"),
          image: localStorage.getItem("image"),
        },
      })
      .then((res) => {
        setLoading(false);
        if (res.data.result === 4) {
          setWebsiteFeedback({
            title: "",
            desc: "",
          });
          navigate("/");
          toast.success("Thank you for the feedback...", {
            position: "top-center",
          });
        } else {
          toast.error("Exact same feedback exists already...", {
            position: "top-center",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const increaseVote = (data) => {
    console.log(otherFeedbacks);
    let newData;
    let voteNoted = false;
    setOtherFeedbacks((prevData) => {
      console.log("prevData");
      console.log(prevData);
      newData = prevData.map((someData) => {
        if (
          someData.username === data.username &&
          someData.title === data.title &&
          someData.desc === data.desc &&
          !someData.votedUsers.includes(localStorage.getItem("username"))
        ) {
          voteNoted = true;
          return {
            ...someData,
            votes: someData.votes + 1,
            votedUsers: [
              ...someData.votedUsers,
              localStorage.getItem("username"),
            ],
          };
        }
        return someData;
      });
      if (voteNoted) {
        axios
          .post("http://localhost:8080/updatewebsitefeedbackvotes", {
            username: data.username,
            title: data.title,
            desc: data.desc,
            votes: data.votes,
          })
          .then((response) => {
            const result = response.data.result;
            if (result === 2) {
              newData = prevData.map((someData) => {
                if (
                  someData.username === data.username &&
                  someData.title === data.title &&
                  someData.desc === data.desc &&
                  !someData.votedUsers.includes(
                    localStorage.getItem("username")
                  )
                ) {
                  voteNoted = true;
                  return {
                    ...someData,
                    votes: someData.votes - 1,
                    votedUsers: [
                      ...someData.votedUsers,
                      localStorage.getItem("username"),
                    ],
                  };
                }
                return someData;
              });
            }
          });
      }
      if (!voteNoted) {
        toast.error("only one vote per user", {
          position: "top-center",
        });
      }
      return newData;
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
          {otherFeedbacks.length === 0
            ? "No feedbacks yet..."
            : otherFeedbacks.map((elem, index) => {
                return (
                  <div className="each-feedback-container" key={index}>
                    <div>{elem.username}</div>
                    <img src={elem.image} alt="user"></img>
                    <span>
                      {new Date(elem.date).getDate() +
                        "/" +
                        (new Date(elem.date).getMonth() + 1) +
                        "/" +
                        new Date(elem.date).getFullYear()}
                    </span>
                    <div className="votes">
                      <div className="number">{elem.votes}</div>
                      <div
                        className="vote-button"
                        onClick={() => {
                          increaseVote(elem);
                        }}
                      >
                        VOTE
                      </div>
                    </div>
                    <div className="feedback-titleanddesc">
                      <div className="feedback-title">{elem.title}</div>
                      <div className="feedback-desc">{elem.desc}</div>
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
