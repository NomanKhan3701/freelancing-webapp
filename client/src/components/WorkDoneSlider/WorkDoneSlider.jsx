import React from "react";
import "./WorkDoneSlider.scss";

const WorkDoneSlider = () => {
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
              <img src={imageSrc} />
              <div className="slide">{item.category}</div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default WorkDoneSlider;