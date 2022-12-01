import logo from "../../Assets/images/Logo.png";
import facebookIcon from "../../Assets/images/fb.png";
import whatsIcon from "../../Assets/images/whats.png";
import twitterIcon from "../../Assets/images/twitter.png";
const Footer = () => {
  return (
    <div className="flex justify-between items-center py-5 md:py-2 container px-0 lg:px-5 mx-auto">
      <div className="basis-1/5 sm:basis-auto">
        <img className="w-3/4 md:w-full" src={logo} alt="FooterLogo" />
      </div>
      <p className="text-center text-base sm:text-lg md:text-2xl basis-1/2 sm:basis-auto ">
        جميع الحقوق محفوظة لبنك الدم &reg; 2022
      </p>
      <ul className="flex justify-between gap-3 basis-[20%] sm:basis-auto">
        <li>
          <a href="/">
            <img src={facebookIcon} alt="facebook-logo" />
          </a>
        </li>
        <li className="">
          <a href="/">
            <img src={whatsIcon} alt="whats-icon" />
          </a>
        </li>
        <li>
          <a href="/">
            <img src={twitterIcon} alt="twiiter-icon" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
