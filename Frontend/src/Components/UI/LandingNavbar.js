import React from "react";
import { useState } from "react";
import { AiOutlineAlignLeft, AiOutlineClose } from "react-icons/ai";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Link } from "react-router-dom";
import logo from "../../Assets/images/Logo.png";

const LandingNavbar = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [clicked, setClicked] = useState(false);
  const animateAos = !clicked ? props["data-aos"] : "";
  return (
    <nav
      data-aos={animateAos}
      className={`md:h-auto md:container px-5 flex flex-wrap mx-auto pt-1 pb-6 rounded-xl md:py-0 items-center justify-between w-full text-lg text-gray-700 ${
        showMenu
          ? "bg-white h-full content-between fixed md:static z-10 md:z-0 transition-opacity"
          : "bg-transparent"
      } md:bg-transparent`}
    >
      <div>
        <Link to={"/"}>
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <div
        onClick={() => {
          setClicked(true);
          return !showMenu ? setShowMenu(true) : setShowMenu(false);
        }}
      >
        {showMenu ? (
          <AiOutlineClose className="md:hidden text-4xl font-bold cursor-pointer self-center" />
        ) : (
          <AiOutlineAlignLeft className="md:hidden text-4xl font-bold cursor-pointer self-center" />
        )}
      </div>

      <div
        className={`${
          !showMenu ? "hidden" : ""
        } w-full pb-4 md:pb-0 md:flex md:items-center md:w-auto`}
        id="menu"
      >
        <ul
          className="
          transition-all
        text-center  
        pt-4
        text-base text-gray-700
        md:flex
        md:justify-between 
        md:pt-0"
        >
          <li className="text-5xl  md:text-xl">
            <AnchorLink
              className="md:p-4 py-2 block hover:text-red-600"
              href="#about"
            >
              من نحن
            </AnchorLink>
          </li>
          <li className="text-5xl  md:text-xl py-10 md:py-0">
            <AnchorLink
              className="md:p-4 py-2 block hover:text-red-600"
              href="#blood"
            >
              عن الدم
            </AnchorLink>
          </li>
          <li className="text-5xl  md:text-xl">
            <AnchorLink
              className="md:p-4 py-2 block hover:text-red-600"
              href="#contact"
            >
              تواصل معنا
            </AnchorLink>
          </li>
        </ul>
      </div>
      <div
        className={`${
          !showMenu ? "hidden" : "w-full md:w-auto"
        }  flex flex-col md:flex-row md:flex  text-center gap-4`}
      >
        <Link
          to={"sign-in"}
          className="outlined-btn py-3 md:py-2 text-2xl sm:text-lg "
        >
          تسجيل الدخول
        </Link>
        <Link
          to={"sign-up"}
          className="contained-btn py-3 md:py-2 text-2xl sm:text-lg"
        >
          حساب جديد
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
