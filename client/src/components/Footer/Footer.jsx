import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import { Mail, Phone } from "@material-ui/icons";
import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-up">
        <div className="address">
          <h3>Address</h3>
          <div className="flex-container">
            Bhavans Campus, Old D N Nagar, Munshi Nagar, Andheri West, Mumbai,
            Maharashtra 400058
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
      <div className="footer-mid"></div>
      <div className="footer-down">
        <div className="numberandtext">
          <span className="number">58,699,420</span>
          <p>Registered Users</p>
        </div>
        <div className="numberandtext">
          <span className="number">21,99,433</span>
          <p>Total Jobs Posted</p>
        </div>
        <div>
          <span>Copyright 2022 © </span>
          FreeLance.com
        </div>
      </div>
    </div>
  );
};

export default Footer;
