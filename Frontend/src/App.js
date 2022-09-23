import { Route, Routes, BrowserRouter } from "react-router-dom";
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
