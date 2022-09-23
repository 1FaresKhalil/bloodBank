import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Components/Pages/Home";
import LandingPage from "./Components/Pages/LandingPage";
import SignIn from "./Components/Pages/SignIn";
import SignUp from "./Components/Pages/SignUp";

const App = () => {
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
