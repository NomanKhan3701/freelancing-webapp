import './App.css';
import { FindTalent, Home, LoginSignup } from './pages/import';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/import';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <LoginSignup status="signup"/>
      </div>
    </BrowserRouter>
  );
}

export default App;
