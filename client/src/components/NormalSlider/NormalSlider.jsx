import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./NormalSlider.scss";
import { useNavigate } from "react-router-dom";
import { Navigation } from "swiper";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const NormalSlider = (props) => {
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
  return (
    <div className="normal-slider-container">
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        slidesPerGroup={2}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
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
      </Swiper>
    </div>
  );
};

export default NormalSlider;
