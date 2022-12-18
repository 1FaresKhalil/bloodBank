import React from "react";
import HomeContent from "../Layouts/HomeContent";
import HomeModal from "../Layouts/HomeModal";
import Footer from "../UI/Footer";
import Navbar from "../UI/Navbar";

const Home = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <HomeModal />
      <HomeContent />
      <Footer />
    </div>
  );
};

export default Home;
