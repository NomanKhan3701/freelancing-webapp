import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-up">
        <div className="footer-up-content">
          <h3>For Client</h3>
          <div className="flex-container">
            <div>How to hire</div>
            <div>Talent Marketplace</div>
            <div>Project Catalog</div>
            <div>Talent Scout</div>
            <div>Hire an Agency</div>
            <div>Enterprise</div>
          </div>
        </div>
        <div className="address">
          <h3>For Talent</h3>
          <div className="flex-container">
            <div>How to Find Work</div>
            <div>Direct Contacts</div>
            <div>Find Freelance Jobs Worldwide</div>
          </div>
        </div>
        <div className="address">
          <h3>Resource</h3>
          <div className="flex-container">
            <div>Help & Support</div>
            <div>Success Stories</div>
            <div>Upwork Reviews</div>
            <div>Resources</div>
            <div>Blog</div>
            <div>Community</div>
          </div>
        </div>
        <div className="connect-us">
          <h3>Stay Connected</h3>
          <div className="icons">
            <Facebook />
            <Instagram />
            <Twitter />
          </div>
        </div>
      </div>
      <div className="footer-mid">
        <div>
          <span>© Copyright 2021</span>, Singapore Zoological Gardens. All
          Rights Reserved. Mandai Wildlife Reserve, Mandai River Wonders,
          Singapore Zoo, Night Safari, Wildlife Reserves Singapore and Jurong
          Bird Park are copyrighted by and/or trade marks of Singapore
          Zoological Gardens (and/or its affiliate(s)) in Singapore and/or other
          countries, as the case may be.
        </div>
      </div>
      <div className="footer-down">
        <div>
          <span>Developed by : </span>Noman, Shreyash and Tarun
        </div>
      </div>
    </div>
  );
};

export default Footer;
