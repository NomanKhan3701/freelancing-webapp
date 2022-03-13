import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import './NormalSlider.scss'

import { Pagination, Navigation } from "swiper"; 
import Cha from '../../assets/images/Cha2.jpg'

const NormalSlider = () => {
  return (
    <div className="normal-slider-container">
        <Swiper
        slidesPerView={5}
        spaceBetween={10}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[ Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
          <div className="category-name">
              Designer
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
          <div className="category-name">
              Frontend web Developer
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
          <div className="category-name">
            Backend web Developer
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
          <div className="category-name">
            App Developer
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
          <div className="category-name">
            UI/UX Designer
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
          <div className="category-name">
            CyberSecurity
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
          <div className="category-name">
            Logo Creater
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
          <div className="category-name">
            Video Editor
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Cha} />
          <div className="category-name">
            App Developer
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
          <div className="category-name">
              Designer
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
          <div className="category-name">
              Frontend web Developer
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
          <div className="category-name">
            Backend web Developer
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
          <div className="category-name">
            App Developer
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
          <div className="category-name">
            UI/UX Designer
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
          <div className="category-name">
            CyberSecurity
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default NormalSlider