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
<<<<<<< HEAD
  UserDashboard
=======
  UserDashboard,
  AllWorks,
  AllPosts,
  ClientProjectProgress,
>>>>>>> fae37e3682b96f65cec387c83f2788f225c6b64d
} from "./pages/import";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/import";
import FindTalentParams from "./pages/FindTalent/FindTalentParams";
import FindWorkParams from "./pages/FindWork/FindWorkParams";

function App() {
<<<<<<< HEAD

=======
>>>>>>> fae37e3682b96f65cec387c83f2788f225c6b64d
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="findtalent" element={<FindTalent />} />
        <Route path="/userdashboard" element={<UserDashboard />}></Route>
        <Route path="/clientdashboard" element={<UserDashboard />}></Route>

        {/* //write category component, post component */}
        <Route path="/findtalent/category" element={<FindTalentParams />} />
        <Route path="/findtalent/postwork" element={<PostWork />} />

        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/postrequest" element={<PostWork />} />

<<<<<<< HEAD
        <Route path="/findwork" element={<FindWork />} />
        <Route path="/findwork/category" element={<FindWorkParams />} />
        <Route path="/findwork/bid" element={<Bid />} />

        <Route path="/findpartner" element={<FindPartner />} />
=======
        <Route path = "/findwork" element = {<FindWork type="findwork"/>} />
        <Route path = "/findwork/category" element = {<FindWorkParams />} />
        <Route path = "/findwork/bid" element = {<Bid/>}/>
        <Route path = '/clientDashboard' element = {<ClientDashboard/>}/>
        <Route path = '/freelancerprofile' element = {<FreelancerProfile/>}/>
        <Route path = 'userprofile/allwork' element = {<AllWorks/>}/>
        <Route path = 'userprofile/allpost' element = {<AllPosts/>}/>
        <Route path = '/clientprojectprogress' element = {<ClientProjectProgress/>}/>
        <Route path="/chat" element={<Chat />} />
>>>>>>> fae37e3682b96f65cec387c83f2788f225c6b64d

        <Route path="/freelancerprofile" element={<FreelancerProfile />} />

        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/postrequest" element={<PostWork />} />

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