import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import userImg from "../../assets/images/Cha2.jpg";
import "./SliderThreeD.scss";

import { EffectCoverflow, Autoplay } from "swiper";
import Card from "./../Card/Card";
import { useNavigate } from "react-router";

const ReviewSlider = () => {
  const navigate = useNavigate();
  const gigSelected = (event) => {
    //left work to do, getting the user id, then going to user profile or dashboard
    navigate("/userprofile");
  };
  return (
    <div className="slider-threeD-container">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 10,
          stretch: 0,
          depth: 250,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide onClick={gigSelected}>
          <Card
            headerImg="https://www.templarbit.com/images/blog/templarbit-illustration-csp-header-92837bc0.jpg"
            userImg={userImg}
            name="shreyash"
            desc="Inventor"
            rating="0"
            startPrice="2000"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
