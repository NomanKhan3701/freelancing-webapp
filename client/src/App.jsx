import './App.css';
import { Home, LoginSignup } from './pages/import';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
<<<<<<< HEAD
    <BrowserRouter className="App">
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = 'login' element = {<LoginSignup status = "login"/>} />
        <Route path = 'signup' element = {<LoginSignup status = "signup"/>} />
        <Route path = '*' element = {<h1>no element attached with this path</h1>}/>
      </Routes>
=======
    <BrowserRouter>
      <div className="App">
        <FindTalent/>
      </div>
>>>>>>> 788a0dd6551b988910ab5a9a218a67ca8b00932f
    </BrowserRouter>
  );
}

export default App;
