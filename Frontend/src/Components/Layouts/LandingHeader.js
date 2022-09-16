import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import LandingNavbar from "../UI/LandingNavbar";
import background from "../../Assets/images/Background.png";

const Header = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);
  return (
    <header
      style={{ backgroundImage: `url(${background})` }}
      className="bg-no-repeat bg-cover h-screen bg-[position:top]"
    >
      <LandingNavbar data-aos="fade-down" />
      <div
        data-aos="fade-up"
        className="flex flex-col justify-center items-center h-1/4"
      >
        <h1 className="text-5xl my-3">تبرع بالدم</h1>
        <h2 className="font-Rakkas text-3xl">انقذ حياه انسان</h2>
      </div>
    </header>
  );
};

export default Header;
