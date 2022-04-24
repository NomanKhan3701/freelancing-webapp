import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./SliderThreeD.scss";

import { EffectCoverflow, Autoplay } from "swiper";
import Card from "./../Card/Card";

const ReviewSlider = (props) => {
  const gigs = [];
  if (props.type === "topgigs") {
    for (let i = 0; i < props.cardsData.length; i++) {
      if (props.cardsData[i].rating >= 4) {
        gigs.push(props.cardsData[i]);
      }
    }
  } else if (props.type === "newgigs") {
    for (let i = 0; i < props.cardsData.length; i++) {
      if (props.cardsData[i].rating === 0) {
        gigs.push(props.cardsData[i]);
      }
    }
  }

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
        {gigs.map((gig, index) => {
          return (
            <SwiperSlide key={index}>
              <Card
                headerImg="https://www.templarbit.com/images/blog/templarbit-illustration-csp-header-92837bc0.jpg"
                userImg={
                  gig.image ||
                  `https://ui-avatars.com/api/?name=${gig.username}`
                }
                username={gig.username}
                name={gig.fullname}
                desc={gig.desc}
                rating={gig.rating}
                startPrice={gig.price}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
