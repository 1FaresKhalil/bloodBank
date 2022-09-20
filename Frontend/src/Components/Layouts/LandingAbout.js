import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import twoHands from "../../Assets/images/two-hands.png";

const LandingAbout = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);
  return (
    <div
      id="about"
      data-aos="fade-up"
      className="container m-auto px-8 flex flex-col md:flex-row justify-between "
    >
      <div className="mt-10 lg:mt-0  md:basis-8/12 lg:basis-1/2 xl:basis-1/3 self-center">
        <h2 className="my-5 md:mb-10 md:mt-0 text-3xl md:text-5xl text-red-500">
          من نحن
        </h2>
        <p className="mb-2 md:my-7 text-xl md:text-2xl">
          هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم
          تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات
        </p>
        <p className="mb-5 md:my-7  text-xl md:text-2xl">
          هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم
          تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات
        </p>
        <button className="contained-btn text-xl md:text-2xl mt-3">
          انضم الينا
        </button>
      </div>
      <div className="mt-5 md:mt-0">
        <img src={twoHands} alt="two hands" />
      </div>
    </div>
  );
};

export default LandingAbout;
