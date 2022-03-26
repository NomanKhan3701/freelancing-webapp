import "./App.css";
import {
  Bid,
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
import FindTalentParams from "./pages/FindTalent/FindTalentParams";

function App() {
  return (
    <BrowserRouter className = "App">
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "findtalent" element = {<FindTalent />} />
        
        {/* //write category component, post component */}
        <Route path = "/findtalent/category" element = {<FindTalentParams />} />        
        <Route path = "/findtalent/post" element = {<h1>Nothing to render yet</h1>} />


        <Route path = "findwork" element = {<FindWork />} />
        <Route path = "/findwork/bid" element = {<Bid/>}/>

        <Route path = "findpartner" element = {<FindPartner />} />
        
        <Route path = "freelancerprofile" element = {<FreelancerProfile />} />
        
        <Route path = "userprofile" element = {<UserProfile />} />
        <Route path = "postrequest" element = {<PostRequest />} />

        <Route path = "login" element = {<LoginSignup status="login" />} />
        <Route path = "signup" element = {<LoginSignup status="signup" />} />
        
        <Route path = "chat" element = {<Chat />} />
        
        <Route
          path = "*"
          element = {
            <div className = "no-elem">
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
