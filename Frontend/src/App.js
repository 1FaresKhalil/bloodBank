import { Route, Routes, BrowserRouter } from "react-router-dom";
import LandingPage from "./Components/Pages/LandingPage";
import SignUp from "./Components/Pages/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<LandingPage />} />
        <Route index path="sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
