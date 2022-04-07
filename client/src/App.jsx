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
  UserDashboard,
  AllWorks,
  AllPosts,
  ClientProjectProgress,
} from "./pages/import";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DragAndDropImg, Navbar } from "./components/import";
import FindTalentParams from "./pages/FindTalent/FindTalentParams";
import FindWorkParams from "./pages/FindWork/FindWorkParams";
import UserProfileInput from "./pages/UserProfileInput/UserProfileInput";

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="findtalent" element={<FindTalent />} />

        <Route path="/findtalent/category" element={<FindTalentParams />} />
        <Route path="/findtalent/postwork" element={<PostWork />} />

        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/userprofileinput" element={<UserProfileInput />} />
        <Route path="/postrequest" element={<PostWork />} />

<<<<<<< HEAD
        <Route path="/findwork" element={<FindWork type="findwork" />} />
        <Route path="/findwork/category" element={<FindWorkParams />} />
        <Route path="/findwork/bid" element={<Bid />} />
        <Route path="/clientDashboard" element={<ClientDashboard />} />
        <Route path="/freelancerprofile" element={<FreelancerProfile />} />

=======
        <Route path = "/findwork" element = {<FindWork type="findwork"/>} />
        <Route path = "/findwork/category" element = {<FindWorkParams />} />
        <Route path = "/findwork/bid" element = {<Bid/>}/>
        <Route path = '/clientDashboard' element = {<ClientDashboard/>}/>
        <Route path = '/freelancerprofile' element = {<FreelancerProfile/>}/>
        <Route path = 'userprofile/allwork' element = {<AllWorks/>}/>
        <Route path = 'userprofile/allpost' element = {<AllPosts/>}/>
        <Route path = '/clientprojectprogress' element = {<ClientProjectProgress/>}/>
>>>>>>> fae37e3682b96f65cec387c83f2788f225c6b64d
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
