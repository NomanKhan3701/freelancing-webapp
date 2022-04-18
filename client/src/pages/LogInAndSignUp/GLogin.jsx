import React from "react";
import { GoogleLogin } from "react-google-login";
import { refreshTokenSetup } from "./refreshToken";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import { setSocket } from "../../features/socket/socketSlice";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setNewMessage } from "../../features/socket/newMessage";
import { setNewBid } from "../../features/socket/newBidSlice";
import { setNewComment } from "../../features/socket/newCommentSlice";
import { setBidAccepted } from "../../features/socket/bidAcceptedSlice";
const axios = require("axios").default;

toast.configure();

function GLogin(props) {
  //i have changed isSignIn = false, in GoogleLogin, works
  const context = props.context;
  let page = props.context.toLowerCase();
  let navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const onSuccess = (res) => {
    localStorage.setItem("username", res.profileObj.email);
    localStorage.setItem("loggedIn", true);
    let onResult = (data) => {
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
          if (location.state && "goingTo" in location.state) {
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
          if (location.state && "goingTo" in location.state) {
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
          if (location.state && "goingTo" in location.state) {
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
    axios
      .post(`http://localhost:8080/${context.toLowerCase()}`, {
        username: res.profileObj.email,
        password: "",
      })
      .then((response) => {
        //response is the object that contains data sent from server
        //response.data is that data
        //response is the object that contains data sent from server
        //response.data is that data
        //localStorage.setItem("isDataTaken", response.data.userDataTaken);
        if (
          response.data.result === 3 ||
          response.data.result === 4 ||
          response.data.result === 6
        ) {
          localStorage.setItem("username", res.profileObj.email);
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("isDataTaken", response.data.userDataTaken);
          const newSocket = io("http://localhost:8080");
          dispatch(setSocket(newSocket));
          if (response.data.chatNotifications) {
            dispatch(setNewMessage({ offlineChatNotifications: true }));
          }
          const bidNotifications = response.data.bidNotifications;
          const bidAcceptedNotifications =
            response.data.bidAcceptedNotifications;
          const commentNotifications = response.data.commentNotifications;

          for (let i = 0; i < bidNotifications.length; i++) {
            dispatch(setNewBid(bidNotifications[i]));
          }
          for (let i = 0; i < bidAcceptedNotifications.length; i++) {
            dispatch(setBidAccepted(bidAcceptedNotifications[i]));
          }
          for (let i = 0; i < commentNotifications.length; i++) {
            dispatch(setNewComment(commentNotifications[i]));
          }
          try {
            if (
              response.data.image &&
              "image" in response.data.image &&
              !response.data.image.image.includes("ui-avatars")
            ) {
              localStorage.setItem("image", response.data.image.image);
            } else {
              localStorage.setItem("image", res.profileObj.imageUrl);
            }
          } catch (err) {
            if (res.profileObj.imageUrl) {
              localStorage.setItem("image", res.profileObj.imageUrl);
            } else {
              localStorage.setItem(
                "image",
                `https://ui-avatars.com/api/?name=${res.profileObj.email}`
              );
            }
          }
        }
        onResult(response.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
    refreshTokenSetup(res);
  };
  const onFailure = (res) => {
    toast.error(`error in google ${context}`, {
      position: "top-center",
    });
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
