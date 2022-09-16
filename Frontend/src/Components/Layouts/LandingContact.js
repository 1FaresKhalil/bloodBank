import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import ContactImage from "../../Assets/images/contact-background.png";
const LandingContact = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);
  return (
    <div
      id="contact"
      data-aos="fade-up"
      style={{ backgroundImage: `url(${ContactImage})` }}
      className="min-h-[525px] mt-24 bg-no-repeat bg-cover bg-[position:left] "
    >
      <div className="container px-5 mx-auto pt-12 md:pt-0">
        <h2 className="text-3xl md:text-5xl pt-[75px] max-w-[508px] leading-[1.5]">
          تواصل معنا اذا كنت تحتاج الى المساعدة
        </h2>
        <button className="outlined-btn bg-white mt-[44px] px-8">
          تواصل معنا
        </button>
      </div>
    </div>
  );
};
export default LandingContact;
