import './App.css';
import { FindTalent, Home, LoginSignup } from './pages/import';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/import';

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = 'findtalent' element = {<FindTalent />}></Route>
        <Route path = 'login' element = {<LoginSignup status = "login"/>} />
        <Route path = 'signup' element = {<LoginSignup status = "signup"/>} />
        <Route path = '*' element = {<h1>no element attached with this path</h1>}/>
      </Routes>
      {/* <LoginSignup status = "login"></LoginSignup> */}
    </BrowserRouter>
  );
}

export default App;
