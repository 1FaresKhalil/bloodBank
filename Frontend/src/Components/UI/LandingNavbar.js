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
      className={`md:container px-5 flex flex-wrap mx-auto pt-1 pb-6 rounded-xl md:py-0 items-center justify-between w-full text-lg text-gray-700 ${
        showMenu ? "bg-white" : "bg-transparent"
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
          <AiOutlineClose className="md:hidden text-4xl font-bold cursor-pointer" />
        ) : (
          <AiOutlineAlignLeft className="md:hidden text-4xl font-bold cursor-pointer" />
        )}
      </div>

      <div
        className={`${
          !showMenu ? "hidden" : ""
        } w-full pb-4 md:pb-0 md:flex md:items-center md:w-auto transition`}
        id="menu"
      >
        <ul
          className="
          
        pt-4
        text-base text-gray-700
        md:flex
        md:justify-between 
        md:pt-0"
        >
          <li className="text-xl">
            <a className="md:p-4 py-2 block hover:text-red-600" href="/">
              من نحن
            </a>
          </li>
          <li className="text-xl">
            <a className="md:p-4 py-2 block hover:text-red-600" href="/">
              عن الدم
            </a>
          </li>
          <li className="text-xl">
            <a className="md:p-4 py-2 block hover:text-red-600" href="/">
              تواصل معنا
            </a>
          </li>
        </ul>
      </div>
      <div
        className={`${
          !showMenu ? "hidden" : ""
        }  flex flex-col md:flex-row md:flex  gap-4 transition`}
      >
        <button className="outlined-btn">تسجيل الدخول</button>
        <button className="contained-btn">حساب جديد </button>
      </div>
    </nav>
  );
};

export default LandingNavbar;
