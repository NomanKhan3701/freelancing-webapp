import React, { useState } from "react";
import { Navbar } from "../../components/import";
import "./EditProfile.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
const EditProfile = () => {
  const [sidenNavElements, setSidenNavElements] = useState([
    {
      elemName: "Edit Username and Password",
      active: false,
      path: "edituandp",
    },
    { elemName: "Edit Basic Information", active: false, path: "editbasic" },
    { elemName: "Edit Profile", active: false, path: "editprofileinfo" },
  ]);

  const clickLiHandler = (elem) => {
    setSidenNavElements(() => {
      return sidenNavElements.map((navElem) => {
        if (navElem === elem) {
          return { ...navElem, active: true };
        } else {
          return { ...navElem, active: false };
        }
      });
    });
  };

  return (
    <>
      <div className="base-container">
        <Navbar />
        <div className="container">
          <div className="sidebar">
            <ul>
              {sidenNavElements.map((elem, index) => {
                return (
                  <Link to={elem.path}>
                    <li
                      key={index}
                      className={elem.active ? "active" : ""}
                      onClick={() => clickLiHandler(elem)}
                    >
                      {elem.elemName}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="edit-component">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
