import React from "react";
import HomeContent from "../Layouts/HomeContent";
import Footer from "../UI/Footer";
import Navbar from "../UI/Navbar";

const Home = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <HomeContent />
      <Footer />
    </div>
  );
};

export default Home;
