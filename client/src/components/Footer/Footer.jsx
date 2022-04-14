import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-up">
        <div className="address">
          <h3>For Talent</h3>
          <div className="flex-container">
            <div>How to Find Work</div>
            <div>Direct Contacts</div>
            <div>Find Freelance Jobs Worldwide</div>
          </div>
        </div>
        {/* <div className="address">
          <h3>Resource</h3>
          <div className="flex-container">
            <div>Help & Support</div>
            <div>Success Stories</div>
            <div>Upwork Reviews</div>
            <div>Resources</div>
            <div>Blog</div>
            <div>Community</div>
          </div>
        </div> */}
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
          <span>© Copyright 2022</span>, Except as permitted by the copyright law applicable to you, you may not reproduce or communicate any of the content on this website, including files downloadable from this website, without the permission of the copyright owner.
          The Indian Copyright Act allows certain uses of content from the internet without the copyright owner’s permission. This includes uses by educational institutions and by Commonwealth and State governments, provided fair compensation is paid. For more information, see www.copyright.com.in and www.copyright.org.in.
          The owners of copyright in the content on this website may receive compensation for the use of their content by educational institutions and governments, including from licensing schemes managed by Copyright Agency.
          We may change these terms of use from time to time. Check before re-using any content from this website.
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
