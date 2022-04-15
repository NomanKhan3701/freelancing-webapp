import "./App.css";
import {
  Bid,
  Chat,
  ClientDashboard,
  FindPartner,
  FindTalent,
  FindWork,
  FreelancerProfile,
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
} from "./pages/import";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/import";
import FindTalentParams from "./pages/FindTalent/FindTalentParams";
import FindWorkParams from "./pages/FindWork/FindWorkParams";
import PostTalent from "./pages/PostTalent/PostTalent";
import UserProfileInput from "./pages/UserProfileInput/UserProfileInput";

import VideoCall from "./components/ChatMain/VideoCall";
// import { EditProfileInfo } from "./pages/import";

function App() {
  if (
    !(
      Object.keys(localStorage).includes("isDataTaken") &&
      localStorage.getItem("isDataTaken") === "true"
    )
  ) {
    localStorage.setItem("isDataTaken", "false");
  }

  return (
    <BrowserRouter className="App">
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
        <Route path="/editprofile" element={<EditProfile />}>
          <Route path="edituandp" element={<EditUsername />}></Route>
          <Route path="editbasic" element={<EditBasicInfo />}></Route>
          <Route path="editprofileinfo" element={<EditProfileInfo />}></Route>
        </Route>

        <Route path="/findpartner" element={<FindPartner />} />

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
    </BrowserRouter>
  );
}

export default App;
