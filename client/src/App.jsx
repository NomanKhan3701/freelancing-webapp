import "./App.css";
import {
  Chat,
  FindPartner,
  FindTalent,
  FindWork,
  FreelancerProfile,
  Home,
  LoginSignup,
  PostRequest,
  UserProfile,
} from "./pages/import";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/import";

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="findtalent" element={<FindTalent />}></Route>
        <Route path="findwork" element={<FindWork />}></Route>
        <Route path="findpartner" element={<FindPartner />}></Route>
        <Route path="freelancerprofile" element={<FreelancerProfile />}></Route>
        <Route path="userprofile" element={<UserProfile />}></Route>
        <Route path="postrequest" element={<PostRequest />}></Route>
        <Route path="login" element={<LoginSignup status="login" />} />
        <Route path="signup" element={<LoginSignup status="signup" />} />
        <Route path="chat" element={<Chat />} />
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
