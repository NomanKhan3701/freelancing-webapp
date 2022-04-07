import React, { useState, useEffect } from "react";
import "./FindWork.scss";
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
import { SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

<<<<<<< HEAD
=======
import { toast } from "react-toastify";
>>>>>>> 0862749b805008c4d2e8a1a0dc532bc4c42b4527
toast.configure();

const FindWork = (props) => {
  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState();

  useEffect(() => {
    axios.get(`http://localhost:8080/${props.type}`).then(function (response) {
      setItems(response.data.items);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    // return <div className = "App">Loading...</div>;
    return <LoadingSpinner />;
  }

  const categorySelected = (event) => {
    const target = event.target;
    let category;
    if (target.classList[0] === "category-name") {
      category = target.textContent.toLowerCase().replace(/\W/g, "");
    } else {
      category = target
        .getElementsByTagName("div")[0]
        .textContent.toLowerCase()
        .replace(/\W/g, "");
    }
    navigate(`/${props.type}/category`, {
      state: {
        category: category,
      },
    });
  };

  //binary to image converter
  const toBase64 = (arr) => {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };
<<<<<<< HEAD

  const validator = () => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn === "false") {
      toast.error("please login before posting your talents.", {
        position: "top-center",
      });
      navigate("/login", { state: { goingTo: "/findwork" } });
      return;
    }

    const isDataTaken = localStorage.getItem("isDataTaken");
    if (isDataTaken === "false") {
      toast.error("please fill this data before posting work.", {
        position: "top-center",
      });
      navigate("/userprofileinput", { state: { goingTo: "/findwork" } });
      return;
    }
    navigate("/findwork/posttalent");
  };

=======
  const goToPostRequest = () => {
    const isDataTaken = localStorage.getItem("isDataTaken");
    if (!isDataTaken) {
      navigate("/findwork/posttalent");
    } else {
      toast.error("You must fill your details before posting the work.", {
        position: "top-center",
      });
      navigate("/userprofileinput");
    }
  };
>>>>>>> 0862749b805008c4d2e8a1a0dc532bc4c42b4527
  return (
    <>
      <div className="find-talent-container">
        <Navbar />
        <div className="categories-container">
          <h1>Categories</h1>
          <div className="find-work-categories">
            {items.map((item) => {
              let imagetype = "data:image/" + item.img.contentType;
              let imageData = toBase64(item.img.data.data);
              let imageSrc = imagetype + ";base64," + imageData;
              return (
                <SwiperSlide onClick={categorySelected} key={item._id}>
                  <img src={imageSrc} />
                  <div className="category-name">{item.category}</div>
                </SwiperSlide>
              );
            })}
          </div>
        </div>
        <div className="post-request">
<<<<<<< HEAD
          <h1>Add Yourself as a freelancer</h1>
          <div className="btn" onClick={validator}>
            Post Talent
=======
          <h1>Post Your Talents As A Freelancer</h1>
          {/* <div className="btn">
            <Link to="/findwork/posttalent">Post Talents</Link>
          </div> */}
          <div className="btn" onClick={goToPostRequest}>
            Post Your Talent
>>>>>>> 0862749b805008c4d2e8a1a0dc532bc4c42b4527
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FindWork;
