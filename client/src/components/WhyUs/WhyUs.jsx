import {
  AutorenewSharp,
  PersonAdd,
  PersonSharp,
  PostAdd,
  PresentToAllSharp,
  SearchTwoTone,
  Security,
} from "@material-ui/icons";
import React, { useEffect } from "react";
import "./whyUs.scss";
import AOS from "aos";
import "aos/dist/aos.css";

const WhyUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 750,
      offset: 250, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      easing: "ease",
      anchorPlacement: "top-center",
    });
  }, []);
  return (
    <div className="whyUs">
      <div className="whyUs-top">
        <h1>Why Us?</h1>
        <div className="content-container">
          <div data-aos="fade-right" className="content">
            <div className="content-header">
              <PostAdd />
              <h3>Post a Job</h3>
            </div>
            <div className="content-desc">
              It’s free and easy to post a job. Simply fill in a title,
              description and budget and competitive bids come within minutes.
            </div>
          </div>
          <div data-aos="fade-right" className="content">
            <div className="content-header">
              <PersonAdd />
              <h3>Choose freelancers</h3>
            </div>
            <div className="content-desc">
              No job is too big or too small. We've got freelancers for jobs of
              any size or budget, across 1800+ skills. No job is too complex. We
              can get it done!
            </div>
          </div>
          <div data-aos="fade-left" className="content">
            <div className="content-header">
              <Security />
              <h3>Pay safely</h3>
            </div>
            <div className="content-desc">
              Only pay for work when it has been completed and you're 100%
              satisfied with the quality using our milestone payment system.
            </div>
          </div>
          <div data-aos="fade-left" className="content">
            <div className="content-header">
              <PostAdd />
              <h3>Browse portfolios</h3>
            </div>
            <div className="content-desc">
              Only pay for work when it has been completed and you're 100%
              satisfied with the quality using our milestone payment system.
            </div>
          </div>
        </div>
      </div>
      <div className="whyUs-bottom">
        <h1>What's great about it?</h1>
        <div className="content-container">
          <div data-aos="fade-right" className="content">
            <div className="content-header">
              <SearchTwoTone />
              <h3>Browse portfolios</h3>
            </div>
            <div className="content-desc">
              Find professionals you can trust by browsing their samples of
              previous work and reading their profile reviews.
            </div>
          </div>
          <div data-aos="fade-up" className="content">
            <div className="content-header">
              <AutorenewSharp />
              <h3>Fast bids</h3>
            </div>
            <div className="content-desc">
              Receive obligation free quotes from our talented freelancers fast.
              80% of projects get bid on within 60 seconds.
            </div>
          </div>
          <div data-aos="fade-down" className="content">
            <div className="content-header">
              <PresentToAllSharp />
              <h3>Quality work</h3>
            </div>
            <div className="content-desc">
              Our site has by far the largest pool of quality freelancers
              globally- over 50 million to choose from.
            </div>
          </div>
          <div data-aos="fade-left" className="content">
            <div className="content-header">
              <SearchTwoTone />
              <h3>Browse portfolios</h3>
            </div>
            <div className="content-desc">
              Find professionals you can trust by browsing their samples of
              previous work and reading their profile reviews.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
