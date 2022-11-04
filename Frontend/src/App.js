import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Components/Pages/Home";
import LandingPage from "./Components/Pages/LandingPage";
import SignIn from "./Components/Pages/SignIn";
import SignUp from "./Components/Pages/SignUp";

import { useEffect, useState } from "react";

const App = () => {
  const users = {
    email: "fares@",
    password: "ssasassasaasas",
    name: "fares",
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
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<LandingPage />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
