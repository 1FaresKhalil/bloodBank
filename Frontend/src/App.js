import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Components/Pages/Home";
import LandingPage from "./Components/Pages/LandingPage";
import SignIn from "./Components/Pages/SignIn";
import SignUp from "./Components/Pages/SignUp";
import Donor from "./Components/Pages/Donor"
import NeedBlood from './Components/Pages/NeedBlood'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<LandingPage />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="home" element={<Home />} />
        <Route path="/home/donor" element={<Donor/>}/>
        <Route path="/home/needblood" element={<NeedBlood/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
