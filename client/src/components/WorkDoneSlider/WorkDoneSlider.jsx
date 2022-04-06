import React, { useState, useEffect } from "react";
import "./WorkDoneSlider.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";

const WorkDoneSlider = () => {

  const works = [{
    title: 'Javscript dev',
    desc: 'Javascrit developer with 2 year experience and a good knowledge of frontend',
    status: 'In progress'
  },{
    title: 'Javscript dev',
    desc: 'Javascrit developer with 2 year experience and a good knowledge of frontend',
    status: 'Done'
  },{
    title: 'Javscript dev',
    desc: 'Javascrit developer with 2 year experience and a good knowledge of frontend',
    status: 'Ongoing'
  },{
    title: 'Javscript dev',
    desc: 'Javascrit developer with 2 year experience and a good knowledge of frontend',
    status: 'Long term'
  },]
  return (
    <div className="work-done-slider">
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
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
        {works.map((work, index) => {
          return (
            <SwiperSlide key={index}>
              <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1, ease: "linear" }}
                  className="work-done-slider-card"
                >
                  <div className="card-title">{work.title}</div>
                  <div className="card-desc">{work.desc}</div>
                  <div className="card-status">{work.status}</div>
                </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default WorkDoneSlider;