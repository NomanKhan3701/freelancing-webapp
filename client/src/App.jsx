import "./App.css";
import {
  Bid,
  Chat,
  ClientDashboard,
  FindPartner,
  FindTalent,
  FindWork,
  FreelancerProfile,
  FeedBack,
  Home,
  LoginSignup,
  PostWork,
  UserProfile,
  AllWorks,
  AllPosts,
  ClientProjectProgress,
  EditProfile,
  EditBasicInfo,
  EditUsername,
  EditProfileInfo,
  WebsiteFeedback,
  AboutUs,
} from "./pages/import";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LimitCharHoverReveal, Navbar } from "./components/import";
import FindTalentParams from "./pages/FindTalent/FindTalentParams";
import FindWorkParams from "./pages/FindWork/FindWorkParams";
import PostTalent from "./pages/PostTalent/PostTalent";
import UserProfileInput from "./pages/UserProfileInput/UserProfileInput";

import VideoCall from "./components/ChatMain/VideoCall";
import { useDispatch, useSelector } from "react-redux";
import { selectSocket } from "./features/socket/socketSlice";
import { useEffect } from "react";
import { setOnlineUsers } from "./features/socket/onlineUsers";
// import { EditProfileInfo } from "./pages/import";

import { addOnlineUser, removeOnlineUser } from "./features/socket/onlineUsers";
import { setNewMessage } from "./features/socket/newMessage";
import { setNewBid } from "./features/socket/newBidSlice";
import { setNewComment } from "./features/socket/newCommentSlice";
import { setBidAccepted } from "./features/socket/bidAcceptedSlice";
import { setFeedback } from "./features/socket/feedbackSlice";
import EditCategoryAndSkills from "./components/EditCategoryAndSkills/EditCategoryAndSkills";

function App() {
  if (
    !(
      Object.keys(localStorage).includes("isDataTaken") &&
      localStorage.getItem("isDataTaken") === "true"
    )
  ) {
    localStorage.setItem("isDataTaken", "false");
  }
  const sender = localStorage.getItem("username");
  const dispatch = useDispatch();
  let socket = useSelector(selectSocket);

  useEffect(() => {
    if (socket) {
      socket.emit("online", sender);
      //get other online users
      socket.on("onJoin", (users) => {
        dispatch(setOnlineUsers(users));
      });

      //if new user joins
      socket.on("newUserJoined", (user) => {
        if (sender !== user) {
          dispatch(addOnlineUser(user));
        }
      });
      socket.on("error", function (err) {
        console.log(err);
      });
      socket.on("userLeft", (username) => {
        if (sender !== username) {
          dispatch(removeOnlineUser(username));
        }
      });
      socket.on("message", (msg) => {
        dispatch(setNewMessage(msg));
      });

      socket.on("newBid", (data) => {
        dispatch(setNewBid(data));
      });
      socket.on("newComment", (data) => {
        dispatch(setNewComment(data));
      });
      socket.on("bidAccepted", (data) => {
        dispatch(setBidAccepted(data));
      });
      socket.on("giveFeedbackToClient", (data) => {
        console.log("sending feedback to clinet that i recieved from backend");
        dispatch(setFeedback(data));
      });
    }
    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      e.returnValue = "";
    });
    return () => {
      window.removeEventListener("beforeunload", function (e) {});
    };
  }, [socket]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/findtalent" element={<FindTalent />} />
        {/* <Route path="/clientdashboard" element={<UserDashboard />}></Route> */}

        {/* //write category component, post component */}
        <Route path="/findtalent/category" element={<FindTalentParams />} />
        <Route path="/findtalent/postwork" element={<PostWork />} />

        <Route path="/findwork" element={<FindWork type="findwork" />} />
        <Route path="/findwork/category" element={<FindWorkParams />} />
        <Route path="/findwork/bid" element={<Bid />} />
        <Route
          path="/findwork/posttalent"
          element={<PostTalent type="postTalent" />}
        />

        <Route path="/video/:id" element={<VideoCall />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/settings" element={<EditProfile />}>
          <Route path="edituandp" element={<EditUsername />}></Route>
          <Route path="editbasic" element={<EditBasicInfo />}></Route>
          <Route path="editprofileinfo" element={<EditProfileInfo />}></Route>
          <Route
            path="editcategoryandskills"
            element={<EditCategoryAndSkills />}
          ></Route>
        </Route>

        <Route path="/websitefeedback" element={<WebsiteFeedback />}></Route>
        <Route path="/findpartner" element={<FindPartner />} />
        <Route
          path="/lc"
          element={
            <LimitCharHoverReveal
              word="Hi I am Noman Plz limit me"
              limit="10"
            />
          }
        />

        <Route path="/freelancerprofile" element={<FreelancerProfile />} />

        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/userprofile/:username" element={<UserProfile />} />
        <Route path="/userprofileinput" element={<UserProfileInput />} />
        <Route path="/postrequest" element={<PostWork />} />

        <Route path="/findwork" element={<FindWork type="findwork" />} />
        <Route path="/findwork/category" element={<FindWorkParams />} />
        <Route path="/findwork/bid" element={<Bid />} />
        <Route path="/clientDashboard" element={<ClientDashboard />} />
        <Route path="/freelancerprofile" element={<FreelancerProfile />} />
        <Route path="userprofile/allwork" element={<AllWorks />} />
        <Route path="userprofile/allpost" element={<AllPosts />} />
        <Route
          path="/clientprojectprogress"
          element={<ClientProjectProgress />}
        />
        <Route path="/chat" element={<Chat />} />

        <Route path="/login" element={<LoginSignup status="login" />} />
        <Route path="/signup" element={<LoginSignup status="signup" />} />

        <Route path="/chat" element={<Chat />} />
        <Route path="/feedback" element={<FeedBack />} />

        <Route
          path="*"
          element={
            <div className="no-elem">
              <Navbar />
              <h1>no element attached with this path</h1>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
