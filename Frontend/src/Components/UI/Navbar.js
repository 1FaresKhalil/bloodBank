import React from "react";
import { useState } from "react";
import { IoLogOut, IoNotifications, IoChatbox } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../../Assets/images/Logo.png";
import profile from "../../Assets/images/profile.png";

const Navbar = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [clicked, setClicked] = useState(false);
  const animateAos = !clicked ? props["data-aos"] : "";
  return (
    <nav
      data-aos={animateAos}
      className={`lg:h-auto lg:container px-5 flex mx-auto pt-1 pb-6 rounded-xl lg:py-0 items-center justify-between w-full text-lg text-gray-700 ${
        showMenu
          ? "bg-white h-full content-between fixed lg:static z-10 lg:z-0 transition-opacity"
          : "bg-transparent"
      } lg:bg-transparent`}
    >
      <div>
        <Link to={"/"}>
          <img src={logo} alt="logo" />
        </Link>
      </div>

      {/* <div
        onClick={() => {
          setClicked(true);
          return !showMenu ? setShowMenu(true) : setShowMenu(false);
        }}
      >
        {showMenu ? (
          <AiOutlineClose className="lg:hidden text-3xl font-bold cursor-pointer self-center" />
        ) : (
          <AiOutlineAlignLeft className="lg:hidden text-3xl font-bold cursor-pointer self-center" />
        )}
      </div> */}

      <div className="flex justify-between items-center gap-5 rounded-[80px] bg-[#F3E1E1] pr-1 lg:pr-4">
        <div className="flex justify-between items-center gap-2  ">
          <button className="rounded-full bg-[#F24E1E] p-2 text-center">
            <IoLogOut className="text-white text-lg" />
          </button>
          <button className="rounded-full bg-[#F24E1E] p-2 text-center">
            <IoChatbox className="text-white text-lg" />
          </button>
          <button className="rounded-full bg-[#F24E1E] p-2 text-center">
            <IoNotifications className="text-white text-lg" />
          </button>
        </div>
        <div className="flex">
          <button>
            <img src={profile} alt="profile" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
