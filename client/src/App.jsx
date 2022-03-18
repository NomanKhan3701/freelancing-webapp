import './App.css';
import { Chat, FindPartner, FindTalent, FindWork, Home, LoginSignup } from './pages/import';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/import';

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = 'findtalent' element = {<FindTalent />}></Route>
        <Route path = 'findwork' element = {<FindWork/>}></Route>
        <Route path = 'findpartner' element = {<FindPartner/>}></Route>
        <Route path = 'login' element = {<LoginSignup status = "login"/>} />
        <Route path = 'signup' element = {<LoginSignup status = "signup"/>} />
        <Route path = 'chat' element = {<Chat/>}/>
        <Route path = '*' element = {<><Navbar/><h1>no element attached with this path</h1></>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
