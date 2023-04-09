// import logo from "../../assets/images/Logo.png";
// import facebookIcon from "../../assets/images/fb.png";
// import whatsIcon from "../../assets/images/whats.png";
// import twitterIcon from "../../assets/images/twitter.png";
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="flex justify-between items-center py-5 md:py-2 container px-0 lg:px-5 mx-auto">
      <div className="basis-1/5 sm:basis-auto">
        <img
          className="w-3/4 md:w-full"
          src={'/assets/images/Logo.png'}
          alt="FooterLogo"
        />
      </div>
      <p className="text-center text-base sm:text-lg md:text-2xl basis-1/2 sm:basis-auto ">
        جميع الحقوق محفوظة لبنك الدم &reg; 2022
      </p>
      <ul className="flex justify-between gap-3 basis-[20%] sm:basis-auto">
        <li>
          <Link href="/">
            <img src={'/assets/images/fb.png'} alt="facebook-logo" />
          </Link>
        </li>
        <li className="">
          <Link href="/">
            <img src={'/assets/images/whats.png'} alt="whats-icon" />
          </Link>
        </li>
        <li>
          <Link href="/">
            <img src={'/assets/images/twitter.png'} alt="twiiter-icon" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
