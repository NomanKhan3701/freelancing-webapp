import React, { useState, useEffect } from "react";
import "./FindWork.scss";
import { Footer, Navbar } from "../../components/import";
import { useNavigate } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
const server_url = process.env.REACT_APP_server_url;

toast.configure();

const FindWork = (props) => {
  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState();

  useEffect(() => {
    axios.get(`${server_url}/${props.type}`).then(function (response) {
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
  const goToPostRequest = () => {
    const isDataTaken = localStorage.getItem("isDataTaken");
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "false") {
      toast.error("Please login to post.", {
        position: "top-center",
      });
      navigate("/login", {
        state: {
          goingTo: "/findwork/posttalent",
        },
      });
      return;
    }
    if (isDataTaken === "true") {
      navigate("/findwork/posttalent");
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
          <div className="find-work-categories">
            {items.map((item) => {
              let imagetype = "data:image/" + item.img.contentType;
              let imageData = toBase64(item.img.data.data);
              let imageSrc = imagetype + ";base64," + imageData;
              return (
                <div
                  className="swiper-slide"
                  onClick={categorySelected}
                  key={item._id}
                >
                  <img src={imageSrc} />
                  <div className="category-name">{item.category}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="find-work-post-request">
          <h1>Post Your Talents As A Freelancer</h1>
          {/* <div className="btn">
            <Link to="/findwork/posttalent">Post Talents</Link>
          </div> */}
          <div className="btn" onClick={goToPostRequest}>
            Post Your Talent
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FindWork;
