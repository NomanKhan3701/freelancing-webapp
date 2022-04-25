import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import { Mail, Phone } from "@material-ui/icons";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFooterData,
  setFooterData,
} from "../../features/Footer/footerSlice";
import "./footer.scss";
const server_url = process.env.REACT_APP_server_url;

const Footer = () => {
  const footerData = useSelector(selectFooterData);
  const dispatch = useDispatch();
  console.log(process.env);
  console.log(server_url);
  useEffect(() => {
    if (footerData.jobsPosted === null) {
      axios.get(`${server_url}/getFooterData`).then((res) => {
        dispatch(
          setFooterData({
            ...footerData,
            registeredUsers: res.data.data.registeredUsers,
            jobsPosted: res.data.data.jobsPosted,
          })
        );
      });
    }
  }, []);
  return (
    <div className="footer">
      <div className="footer-up">
        <div className="address">
          <h3>Address</h3>
          <div className="flex-container">{footerData.address}</div>
        </div>
        <div className="address">
          <h3>Contact</h3>
          <div className="flex-container">
            <span className="iconandtext">
              <Mail fontSize="medium"></Mail>
              <p> {footerData.gmail}</p>
            </span>
            <span className="iconandtext">
              <Phone fontSize="medium"></Phone>
              <p>{footerData.phoneNumber}</p>
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
          <span className="number">
            {footerData.registeredUsers !== null
              ? footerData.registeredUsers
              : "Calculating"}
          </span>
          <p>Registered Users</p>
        </div>
        <div className="numberandtext">
          <span className="number">
            {footerData.jobsPosted !== null
              ? footerData.jobsPosted
              : "Calculating"}
          </span>
          <p>Total Jobs Posted</p>
        </div>
        <div>
          <span>Copyright 2022 © </span>
          {footerData.url}
        </div>
      </div>
    </div>
  );
};

export default Footer;
