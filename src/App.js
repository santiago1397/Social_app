import Home from './pages/home/Home'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import { BrowserRouter,HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.js";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login />}/>
        <Route path="/login" element={user ? <Navigate to='/home'/> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/login" /> : <Register />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
