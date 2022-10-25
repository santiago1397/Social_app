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
    <BrowserRouter >
      <Routes>
        <Route exact path="/Social_app" element={user ? <Home /> : <Login />}/>
        <Route path="/login" element={user ? <Navigate to='/home'/> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/login" /> : <Register />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
