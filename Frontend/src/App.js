import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Components/Pages/Home";
import LandingPage from "./Components/Pages/LandingPage";
import SignIn from "./Components/Pages/SignIn";
import SignUp from "./Components/Pages/SignUp";
import Donor from "./Components/Pages/Donor";
import NeedBlood from "./Components/Pages/NeedBlood";
import TrackingHealth from "./Components/Pages/TrackingHealth";
import Profile from "./Components/Pages/Profile";
import Settings from "./Components/Pages/Settings";
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<LandingPage />} />
                <Route path="sign-up" element={<SignUp />} />
                <Route path="sign-in" element={<SignIn />} />
                <Route path="home" element={<Home />} />
                <Route path="/home/donor" element={<Donor />} />
                <Route path="/home/needblood" element={<NeedBlood />} />
                <Route
                    path="/home/TrackingHealth"
                    element={<TrackingHealth />}
                />
                <Route path="/home/profile" element={<Profile />} />
                <Route path="/home/settings" element={<Settings />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
