import './App.css';
import { Home, LoginSignup } from './pages/import';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = 'login' element = {<LoginSignup status = "login"/>} />
        <Route path = 'signup' element = {<LoginSignup status = "signup"/>} />
        <Route path = '*' element = {<h1>no element attached with this path</h1>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
