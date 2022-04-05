import React from "react";
import "./WorkSlider.scss";

const WorkSlider = () => {
  return (
    <div className="work-slider">
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {items.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="title"></div>
              <div className="desc"></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default WorkSlider;
