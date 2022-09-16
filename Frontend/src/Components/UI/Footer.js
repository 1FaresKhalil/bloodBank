import logo from "../../Assets/images/Logo.png";
import facebookIcon from "../../Assets/images/fb.png";
import whatsIcon from "../../Assets/images/whats.png";
import twitterIcon from "../../Assets/images/twitter.png";
const Footer = () => {
  return (
    <div className="flex justify-between items-center py-10 container px-5 mx-auto">
      <div>
        <img className="w-3/4 md:w-full" src={logo} alt="FooterLogo" />
      </div>
      <p className="text-base sm:text-lg md:text-2xl ">
        جميع الحقوق محفوظة لبنك الاسكان والتعمير &reg; 2022
      </p>
      <ul className="flex justify-between gap-1">
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
