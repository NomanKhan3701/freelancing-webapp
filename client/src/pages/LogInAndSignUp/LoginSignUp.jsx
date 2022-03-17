import React, { useEffect } from "react";
import "./LoginSignUp.scss";
import loginImg from "../../assets/images/login-img.png";
import signupImg from "../../assets/images/signup-img.png";
import GLogin from "./GLogin";

const LoginSignUp = (props) => {
  const toggle = () => {
    const container = document.querySelector(".login-signup-container");
    container.classList.toggle("login");
    container.classList.toggle("signup");
  };

  useEffect(() => {
    setTimeout(() => {
      const container = document.querySelector(".login-signup-container");
      container.classList.add(`${props.status}`);
    }, 200);
  }, []);

  return (
    <div className="login-signup-container">
      <div className="row">
        <div className="col align-items-center flex-col">
          <div className="form-wrapper align-items-center signup">
            <div className="form">
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input type="password" placeholder="Password" />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input type="password" placeholder="Confirm Password" />
              </div>
              <div className="btn">Sign Up</div>
              <p>
                <b>Forgot Password?</b>
              </p>
              <p>
                <span>Have an account? </span>
                <b onClick={toggle}>Log In</b>
              </p>
            </div>
          </div>
          <div className="social-wrapper">
            <div className="social-list signup">
              <GLogin></GLogin>
            </div>
          </div>
        </div>
        <div className="col align-items-center flex-col">
          <div className="form-wrapper align-items-center login">
            <div className="form">
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input type="password" placeholder="Password" />
              </div>
              <div className="btn">Log in</div>
              <p>
                <b>Forgot Password?</b>
              </p>
              <p>
                <span>Don't have an account? </span>
                <b onClick={toggle}>Sign up</b>
              </p>
            </div>
          </div>
          <div className="social-wrapper">
            <div className="social-list login">
              <GLogin></GLogin>
            </div>
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
