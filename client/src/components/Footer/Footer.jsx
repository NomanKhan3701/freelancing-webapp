import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import { Mail, Phone } from "@material-ui/icons";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "./footer.scss";

const Footer = () => {
  const [registeredUsers, setRegisteredUsers] = useState("Calculating...");
  const [totalJobsPosted, setTotalJobsPosted] = useState("Calculating...");
  useEffect(() => {
    axios.get(`http://localhost:8080/getFooterData`).then((res) => {
      setRegisteredUsers(res.data.data.registeredUsers);
      setTotalJobsPosted(res.data.data.jobsPosted);
      localStorage.setItem("registeredUsers", res.data.data.registeredUsers);
      localStorage.setItem("jobsPosted", res.data.data.jobsPosted);
    });
  });
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
          <span className="number">{registeredUsers}</span>
          <p>Registered Users</p>
        </div>
        <div className="numberandtext">
          <span className="number">{totalJobsPosted}</span>
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
