import React from "react";
import { GoogleLogin } from "react-google-login";
import { refreshTokenSetup } from "./refreshToken";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const axios = require("axios").default;

function GLogin(props) {
  //i have changed isSignIn = false, in GoogleLogin, works
  const context = props.context;
  let navigate = useNavigate();
  const onSuccess = (res) => {
    console.log("[Login Success] CurrentUser:", res.profileObj);
    localStorage.setItem("username", res.profileObj.email);
    //redirect to home page with logo changed on right only if username and password matches
    let onResult = async (data) => {
      console.log("data is " + data);
      switch (data) {
        case 1:
          //pop up on screen that username already exists
          break;
        case 2:
          //nothing
          break;
        case 3:
          //user exist with username and google signUP trying
          navigate("/");
          break;
        case 4:
          //new user created successfully
          localStorage.setItem("loggedIn", "true");
          navigate("/");
          break;
        case 5:
          //username matched not password
          break;
        case 6:
          //login succesfull
          localStorage.setItem("loggedIn", "true");
          navigate("/");
          break;
        default:
        //
      }
    };
    axios
      .post(`http://localhost:8080/${context.toLowerCase()}`, {
        username: res.profileObj.email,
        password: "",
      })
      .then((response) => {
        //response is the object that contains data sent from server
        //response.data is that data
        onResult(response.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
    refreshTokenSetup(res);
  };
  const onFailure = (res) => {
    console.log("[Login failed] res : ", res);
  };
  return (
    <div className="glogin">
      <GoogleLogin
        clientId={process.env.client_id}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <div onClick={renderProps.onClick} className="gLoginbtn">
            <i className="bx bxl-google "></i>
            <span className="context">{context} with Google</span>
          </div>
        )}
        isSignedIn={false}
        data-onsuccess="onSignIn"
      ></GoogleLogin>
    </div>
  );
}

export default GLogin;
