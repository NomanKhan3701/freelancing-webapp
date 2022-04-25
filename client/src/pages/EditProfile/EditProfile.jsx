import React, { useState, useEffect } from "react";
import { FullScreenLoader, Navbar } from "../../components/import";
import "./EditProfile.scss";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUserData } from "../../features/userData/userData";
const EditProfile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [sidenNavElements, setSidenNavElements] = useState([
    {
      elemName: "Edit Username and Password",
      active: false,
      path: "edituandp",
    },
    { elemName: "Edit Basic Information", active: false, path: "editbasic" },
    { elemName: "Edit Profile", active: false, path: "editprofileinfo" },
    {
      elemName: "Edit Category And Skills",
      active: false,
      path: "editcategoryandskills",
    },
  ]);

  useEffect(() => {
    const isDataTaken = localStorage.getItem("isDataTaken");
    if (
      localStorage.getItem("username") &&
      localStorage.getItem("username") === "undefined"
    ) {
      toast.success("You must login before.", {
        position: "top-center",
      });
      navigate("/login");
      return <FullScreenLoader />;
    }
    if (isDataTaken && isDataTaken === "false") {
      toast.success("You must fill your details before viewing the profile.", {
        position: "top-center",
      });
      navigate("/userprofileinput");
      return <FullScreenLoader />;
    }
    axios
      .get(
        `http://localhost:8080/editprofile/${localStorage.getItem("username")}`
      )
      .then((response) => {
        if (response.data.result.length > 0) {
          dispatch(setUserData(response.data.result[0]));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

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
      <div className="edit-profile-base-container">
        <Navbar />
        <div className="edit-profile-container">
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
