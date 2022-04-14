import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import { Mail, Phone } from "@material-ui/icons";
import { FaBeer, FaMailBulk } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { MailIcon } from 'react-mail-icon';
import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-up">
        <div className="address">
          <h3>Address</h3>
          <div className="flex-container">
            {/* <div>How to Find Work</div>
            <div>Direct Contacts</div>
            <div>Find Freelance Jobs Worldwide</div> */}
            Bhavans Campus, Old D N Nagar, Munshi Nagar, Andheri West, Mumbai, Maharashtra 400058
          </div>
        </div>
        <div className="address">
          <h3>Contact</h3>
          <div className="flex-container">
            <span className="iconandtext">
              <Mail fontSize="medium"></Mail>
              <p> 123tarun02@gmail.com</p>
            </span>
            <span className="iconandtext">
              <Phone fontSize="medium"></Phone>
              <p> +91 8104292639</p>
            </span>
          </div>
        </div>
        <div className="connect-us">
          <h3>Stay Connected</h3>
          <div className="icons">
            <Facebook fontSize="medium" />
            <Instagram fontSize="medium" />
            <Twitter fontSize="medium" />
          </div>
        </div>
      </div>
      <div className="footer-mid">
        {/* <div> */}
        {/* <span>Copyright 2022 ©  </span> */}
        {/* Except as permitted by the copyright law applicable to you, you may not reproduce or communicate any of the content on this website, including files downloadable from this website, without the permission of the copyright owner. */}
        {/* The Indian Copyright Act allows certain uses of content from the internet without the copyright owner’s permission. This includes uses by educational institutions and by Commonwealth and State governments, provided fair compensation is paid. For more information, see www.copyright.com.in and www.copyright.org.in. */}
        {/* The owners of copyright in the content on this website may receive compensation for the use of their content by educational institutions and governments, including from licensing schemes managed by Copyright Agency. */}
        {/* We may change these terms of use from time to time. Check before re-using any content from this website. */}
        {/* FreeLance.com */}
        {/* </div> */}
      </div>
      <div className="footer-down">
        <div className="numberandtext">
          {/* <span>Developed by : </span>Noman, Shreyash and Tarun */}
          <span className="number">58,699,420</span>
          <p>Registered Users</p>
        </div>
        <div className="numberandtext">
          <span className="number">21,99,433</span>
          <p>Total Jobs Posted</p>
        </div>
        <div>
          <span>Copyright 2022 ©  </span>
          {/* Except as permitted by the copyright law applicable to you, you may not reproduce or communicate any of the content on this website, including files downloadable from this website, without the permission of the copyright owner. */}
          {/* The Indian Copyright Act allows certain uses of content from the internet without the copyright owner’s permission. This includes uses by educational institutions and by Commonwealth and State governments, provided fair compensation is paid. For more information, see www.copyright.com.in and www.copyright.org.in. */}
          {/* The owners of copyright in the content on this website may receive compensation for the use of their content by educational institutions and governments, including from licensing schemes managed by Copyright Agency. */}
          {/* We may change these terms of use from time to time. Check before re-using any content from this website. */}
          FreeLance.com
        </div>
      </div>
    </div>
  );
};

export default Footer;
