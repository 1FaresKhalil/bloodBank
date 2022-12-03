import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Components/Pages/Home";
import LandingPage from "./Components/Pages/LandingPage";
import Profile from "./Components/Pages/Profile";
import SignIn from "./Components/Pages/SignIn";
import SignUp from "./Components/Pages/SignUp";
import Donor from "./Components/Pages/Donor";
import NeedBlood from "./Components/Pages/NeedBlood";
import TrackingHealth from "./Components/Pages/TrackingHealth";
import DonationHistory from "./Components/Pages/DonationHistory";

import { useEffect, useState } from "react";
import Settings from "./Components/Pages/Settings";

const App = () => {
  const users = {
    email: "75faresd@gg.com",
    name: "H. Simpson",
    password: "12345",
    confirmPassword: "12345",
  };

  const fetchData = async () => {
    const res = await fetch("http://localhost:3002/signup", {
      method: "POST",
      body: JSON.stringify(users),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    return false;
  };
  // fetchData();
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<LandingPage />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="home" element={<Home />} />
        <Route path="/home/donor" element={<Donor />} />
        <Route path="/home/needblood" element={<NeedBlood />} />
        <Route path="/home/TrackingHealth" element={<TrackingHealth />} />
        <Route path="/home/profile" element={<Profile />} />
        <Route path="/home/settings" element={<Settings />} />
        <Route path="/home/DonationHistory" element={<DonationHistory />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
