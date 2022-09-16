import React from "react";
import { useState } from "react";
import { AiOutlineAlignLeft, AiOutlineClose } from "react-icons/ai";
import logo from "../../Assets/images/Logo.png";

const LandingNavbar = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [clicked, setClicked] = useState(false);
  const animateAos = !clicked ? props["data-aos"] : "";
  return (
    <nav
      data-aos={animateAos}
      className={`md:h-auto md:container px-5 flex flex-wrap mx-auto pt-1 pb-6 rounded-xl md:py-0 items-center justify-between w-full text-lg text-gray-700 ${
        showMenu ? "bg-white h-full content-between" : "bg-transparent"
      } md:bg-transparent`}
    >
      <div>
        <a href="/">
          <img src={logo} alt="logo" />
        </a>
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
        } w-full pb-4 md:pb-0 md:flex md:items-center md:w-auto `}
        id="menu"
      >
        <ul
          className="
        text-center  
        pt-4
        text-base text-gray-700
        md:flex
        md:justify-between 
        md:pt-0"
        >
          <li className="text-5xl md:text-xl">
            <a className="md:p-4 py-2 block hover:text-red-600" href="/">
              من نحن
            </a>
          </li>
          <li className="text-5xl md:text-xl py-10 md:py-0">
            <a className="md:p-4 py-2 block hover:text-red-600" href="/">
              عن الدم
            </a>
          </li>
          <li className="text-5xl md:text-xl">
            <a className="md:p-4 py-2 block hover:text-red-600" href="/">
              تواصل معنا
            </a>
          </li>
        </ul>
      </div>
      <div
        className={`${
          !showMenu ? "hidden" : "w-full"
        }  flex flex-col md:flex-row md:flex  gap-4`}
      >
        <button className="outlined-btn w-[137px]">تسجيل الدخول</button>
        <button className="contained-btn w-[137px]">حساب جديد </button>
      </div>
    </nav>
  );
};

export default LandingNavbar;
