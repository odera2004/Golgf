import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Addtournament from "./pages/Addtournament"
import Login from "./pages/Login"
import Profile from "./pages/Profile";
import Register from "./pages/Register"
import About from "./pages/About"
import Contactus from "./pages/ContactUs";
import { UserProvider } from "./context/UserContext";
import { TournamentProvider } from "./context/TournamentContext";

function App() {

  return (
    
    <BrowserRouter>

    <UserProvider>
    <TournamentProvider>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="profile" element={<Profile />} />
          <Route path="addtournament" element={<Addtournament/>} />

        </Route>
      </Routes>

      </TournamentProvider>
      </UserProvider>
      
    </BrowserRouter>

    
  )
}

export default App