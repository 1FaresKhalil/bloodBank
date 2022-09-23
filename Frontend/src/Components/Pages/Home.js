import React from "react";
import Footer from "../UI/Footer";
import Navbar from "../UI/Navbar";
import donate from "../../Assets/images/donate.png";
import needblood from "../../Assets/images/needblood.png";
import health from "../../Assets/images/health.png";
import HomeCard from "../UI/HomeCard";

const Home = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="container mx-auto gap-4 mt-4 lg:mt-5 flex flex-col lg:flex-row justify-between lg:h-5/6 px-5 ">
        <HomeCard
          bg={needblood}
          title={`البحث عن متبرع`}
          description={`هنالك العديد من الأنواع المتوفرة
        لنصوص لوريم إيبسومولكن
        هنالك العديد من الأنواع المتوفرة
        ما عبر إدخال بعض النوادر
        أو الكلمات العشوائية`}
          buttonText={`ابحث عن متبرع`}
        />
        <HomeCard
          bg={health}
          title={`متابعة صحتك`}
          description={`هنالك العديد من الأنواع المتوفرة
        لنصوص لوريم إيبسومولكن
        هنالك العديد من الأنواع المتوفرة
        ما عبر إدخال بعض النوادر
        أو الكلمات العشوائية`}
          buttonText={`تابع صحتك`}
        />
        <HomeCard
          bg={donate}
          title={`تبرع بالدم`}
          description={`هنالك العديد من الأنواع المتوفرة
        لنصوص لوريم إيبسومولكن
        هنالك العديد من الأنواع المتوفرة
        ما عبر إدخال بعض النوادر
        أو الكلمات العشوائية`}
          buttonText={`تبرع الان`}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
