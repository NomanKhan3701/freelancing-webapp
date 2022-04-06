/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginSignUp.scss";
import loginImg from "../../assets/images/login-img.png";
import signupImg from "../../assets/images/signup-img.png";
import GLogin from "./GLogin";

import { useLocation } from "react-router-dom";

toast.configure();

const axios = require("axios").default;

const LoginSignUp = (props) => {
  //to redirect after cliking signUp or login option on LoginSignUp page
  let navigate = useNavigate();
  const location = useLocation();

  const routeChangeToSignUp = () => {
    let path = `/signup`;
    navigate(path);
    toggle();
  };

  const routeChangeToLogin = () => {
    let path = `/login`;
    navigate(path);
    toggle();
  };

  const toggle = () => {
    const container = document.querySelector(".login-signup-container");
    container.classList.toggle("login");
    container.classList.toggle("signup");
  };

  useEffect(() => {
    const container = document.querySelector(".login-signup-container");
    container.classList.add(`${props.status}`);
    //ask noman before removing
    // setTimeout(() => {
    //   const container  =  document.querySelector(".login-signup-container");
    //   container.classList.add(`${props.status}`);
    // }, 200);
  }, []);

  const [userSignUpData, setUserSignUpData] = useState({
    usernameSignUp: "",
    passwordSignUp: "",
    confirmPasswordSignUp: "",
  });

  const [userLoginData, setUserLoginData] = useState({
    usernameLogin: "",
    passwordLogin: "",
  });

  const loginDataChange = (event) => {
    const { value, name } = event.target;
    setUserLoginData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const signUpDataChange = (event) => {
    const { value, name } = event.target;
    setUserSignUpData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const loginOrSubmit = (event) => {
    const context = event.target.getAttribute("name");
    let username1, password1;
    if (context === "login") {
      const username = userLoginData.usernameLogin;
      const password = userLoginData.passwordLogin;
      if (username === "" || password === "") {
        //pop up
        // toast.error("Please enter all the field values", {
        //   position: "top-right",
        // });
        toast.error("Please enter all the field values", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      username1 = username;
      password1 = password;
    } else {
      const username = userSignUpData.usernameSignUp;
      const password = userSignUpData.passwordSignUp;
      const confirmPassword = userSignUpData.confirmPasswordSignUp;
      if (username === "" || password === "" || confirmPassword === "") {
        //pop up
        toast.error("Input cannot be empty.", {
          position: "top-left",
        });
        return;
      } else if (password !== confirmPassword) {
        //pop up
        toast.error("Password is not matching with confirm password", {
          position: "top-left",
        });
        return;
      }
      username1 = username;
      password1 = password;
    }
    axios
      .post(`http://localhost:8080/${context.toLowerCase()}`, {
        username: username1,
        password: password1,
      })
      .then((response) => {
        //response is the object that contains data sent from server
        //response.data is that data
        if (
          response.data.result === 3 ||
          response.data.result === 4 ||
          response.data.result === 6
        ) {
          localStorage.setItem("username", username1);
          localStorage.setItem("loggedIn", true);
        }
        onResult(response.data.result, context.toLowerCase());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let onResult = (data, page) => {
    switch (data) {
      case 1:
        //pop up on screen that username already exists
        toast.error("Username already exist", {
          position: "top-left",
        });
        break;
      case 2:
        //nothing
        const position = page === "login" ? "top-right" : "top-left";
        toast.error("Username doesnt exist.", {
          position: position,
        });

        break;
      case 3:
        //user exist with username and google signUP trying
        if (location.state.goingTo) {
          navigate(location.state.goingTo);
          return;
        }
        navigate("/");
        break;
      case 4:
        //new user created successfully
        if (location.state.goingTo) {
          navigate(location.state.goingTo);
          return;
        }
        navigate("/");
        break;
      case 5:
        //username matched not password
        toast.error("Username or password not matched", {
          position: "top-right",
        });
        break;
      case 6:
        //login succesfully
        if (location.state.goingTo) {
          navigate(location.state.goingTo);
          return;
        }
        navigate("/");
        break;
      default:
      //
    }
  };

  return (
    <div className="login-signup-container">
      <div className="row">
        <div className="col align-items-center flex-col">
          <Link to="/" className="logo-login-signup signup">
            Freelance
          </Link>
          <div className="form-wrapper align-items-center signup">
            <form className="form">
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input
                  type="text"
                  name="usernameSignUp"
                  value={userSignUpData.username}
                  placeholder="Username"
                  onChange={signUpDataChange}
                  autoComplete="false"
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="password"
                  name="passwordSignUp"
                  value={userSignUpData.password}
                  placeholder="Password"
                  onChange={signUpDataChange}
                  autoComplete="false"
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="password"
                  name="confirmPasswordSignUp"
                  value={userSignUpData.confirmPassword}
                  placeholder="Confirm Password"
                  onChange={signUpDataChange}
                  autoComplete="false"
                />
              </div>
              <div className="btn" name="signup" onClick={loginOrSubmit}>
                Sign Up
              </div>
              <p>
                <b>Forgot Password?</b>
              </p>
              <p>
                <span>Have an account? </span>
                <b onClick={routeChangeToLogin}>Log In</b>
              </p>
            </form>
          </div>
          <div className="social-wrapper signup">
            <GLogin context="SignUp"></GLogin>
          </div>
        </div>
        <div className="col align-items-center flex-col">
          <Link to="/" className="logo-login-signup login">
            Freelance
          </Link>
          <div className="form-wrapper align-items-center login">
            <form className="form">
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input
                  type="text"
                  name="usernameLogin"
                  value={userLoginData.username}
                  placeholder="Username"
                  onChange={loginDataChange}
                  autoComplete="false"
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="password"
                  name="passwordLogin"
                  value={userLoginData.password}
                  placeholder="Password"
                  onChange={loginDataChange}
                  autoComplete="false"
                />
              </div>
              <div className="btn" name="login" onClick={loginOrSubmit}>
                Log in
              </div>
              <p>
                <b>Forgot Password?</b>
              </p>
              <p>
                <span>Don't have an account? </span>
                <b onClick={routeChangeToSignUp}>Sign up</b>
              </p>
            </form>
          </div>
          <div className="social-wrapper login">
            <GLogin context="Login"></GLogin>
          </div>
        </div>
      </div>
      <div className="row content-row">
        <div className="col align-items-center flex-col">
          <div className="text login">
            <h2>Welcome back</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet
              porro tempore temporibus enim eveniet, dolore voluptatibus
              praesentium autem ducimus error nulla iusto ex eum quos,
              voluptatum sunt optio. Consequatur, minima.
            </p>
          </div>
          <div className="img login">
            <img src={loginImg} alt="welcome" />
          </div>
        </div>
        <div className="col align-items-center flex-col">
          <div className="img signup">
            <img src={signupImg} alt="join us" />
          </div>
          <div className="text signup">
            <h2>Join with us</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet
              porro tempore temporibus enim eveniet, dolore voluptatibus
              praesentium autem ducimus error nulla iusto ex eum quos,
              voluptatum sunt optio. Consequatur, minima.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
