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
import { ScreenOverlayLoader } from "../../components/import";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSocket } from "../../features/socket/socketSlice";
import { io } from "socket.io-client";
import { setNewMessage } from "../../features/socket/newMessage";
import { setNewBid } from "../../features/socket/newBidSlice";
import { setNewComment } from "../../features/socket/newCommentSlice";
import { setBidAccepted } from "../../features/socket/bidAcceptedSlice";
import { setFeedback } from "../../features/socket/feedbackSlice";
toast.configure();
const server_url = process.env.REACT_APP_server_url;

const axios = require("axios").default;

const LoginSignUp = (props) => {
  //to redirect after cliking signUp or login option on LoginSignUp page
  let navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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
    let username1, password1, position;
    const usernameRegex = new RegExp(/^([A-Za-z0-9]|[-._](?![-._])){8,20}$/);
    const passwordRegex = new RegExp(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    );
    if (context === "login") {
      const username = userLoginData.usernameLogin;
      const password = userLoginData.passwordLogin;
      if (username === "" || password === "") {
        toast.error("Please enter all the field values", {
          position: "top-right",
        });
        return;
      }
      username1 = username;
      password1 = password;
      position = "top-right";
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
      }
      if (password !== confirmPassword) {
        //pop up
        toast.error("Password is not matching with confirm password", {
          position: "top-left",
        });
        return;
      }

      username1 = username;
      password1 = password;
      position = "top-left";
    }
    if (!usernameRegex.test(username1)) {
      toast.error(
        "Username must have between 8 and 20 characters and can contain alphanumeric characters A-Z,a-z,0-9, the special characters -._ must not be used successively and username cannot include any whitespaces",
        {
          position: position,
        }
      );
      return;
    }
    if (!passwordRegex.test(password1)) {
      toast.error(
        "Min 8 letter password, with at least a symbol, upper and lower case letters and a number",
        {
          position: position,
        }
      );
      return;
    }
    setLoading(true);
    axios
      .post(`${server_url}/${context.toLowerCase()}`, {
        username: username1,
        password: password1,
      })
      .then((response) => {
        //response is the object that contains data sent from server
        //response.data is that data
        //localStorage.setItem("isDataTaken", response.data.userDataTaken);
        if (
          response.data.result === 3 ||
          response.data.result === 4 ||
          response.data.result === 6
        ) {
          localStorage.setItem("username", username1);
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("isDataTaken", response.data.userDataTaken);
          const newSocket = io(`${server_url}`);
          dispatch(setSocket(newSocket));
          if (response.data.chatNotifications) {
            dispatch(setNewMessage({ offlineChatNotifications: true }));
          }
          const bidNotifications = response.data.bidNotifications;
          const bidAcceptedNotifications =
            response.data.bidAcceptedNotifications;
          const commentNotifications = response.data.commentNotifications;
          const feedbackNotifications = response.data.feedbackNotifications;
          for (let i = 0; i < bidNotifications.length; i++) {
            dispatch(setNewBid(bidNotifications[i]));
          }
          for (let i = 0; i < bidAcceptedNotifications.length; i++) {
            dispatch(setBidAccepted(bidAcceptedNotifications[i]));
          }
          for (let i = 0; i < commentNotifications.length; i++) {
            dispatch(setNewComment(commentNotifications[i]));
          }
          for (let i = 0; i < feedbackNotifications.length; i++) {
            dispatch(setFeedback(feedbackNotifications[i]));
          }
          try {
            localStorage.setItem("image", response.data.image.image);
          } catch (err) {
            localStorage.setItem(
              "image",
              `https://ui-avatars.com/api/?name=${username1}`
            );
          }
        }
        onResult(response.data.result, context.toLowerCase());
      })
      .catch((err) => {
        console.log("if type error no worries");
        console.log(err);
        navigate("/");
      });
  };

  let onResult = (data, page) => {
    setLoading(false);
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
          if ("work" in location.state) {
            navigate(location.state.goingTo, {
              state: {
                work: location.state.work,
              },
            });
            return;
          }
          navigate(location.state.goingTo);
          return;
        }
        navigate("/");
        break;
      case 4:
        //new user created successfully
        if (location.state.goingTo) {
          if ("work" in location.state) {
            navigate(location.state.goingTo, {
              state: {
                work: location.state.work,
              },
            });
            return;
          }
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
        const state = location.state;
        if (state && "goingTo" in state) {
          if ("work" in location.state) {
            navigate(location.state.goingTo, {
              state: {
                work: location.state.work,
              },
            });
            return;
          }
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
    <>
      {loading ? <ScreenOverlayLoader /> : ""}
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
    </>
  );
};

export default LoginSignUp;
