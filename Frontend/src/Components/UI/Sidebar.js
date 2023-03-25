import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import pp from "../../Assets/images/me.jpg";
import money from "../../Assets/images/money.png";
import paper from "../../Assets/images/paper.png";
import settings from "../../Assets/images/settings.png";
import person from "../../Assets/images/person.png";
import trophy from "../../Assets/images/trophy.png";

function Sidebar({ username }) {
  const [showSidebar, setShowSidebar] = useState(false);
  let activeStyle = {};
  if (window.screen.width < 1024) {
    activeStyle = {
      color: "white",
    };
  } else {
    activeStyle = {
      color: "red",
    };
  }
  return (
    <>
      {showSidebar ? (
        <FaTimes
          onClick={() => setShowSidebar(false)}
          className="fixed  text-2xl z-30 flex items-center cursor-pointer right-10 top-6"
        ></FaTimes>
      ) : (
        <FaBars
          className="flex text-2xl text-black items-center cursor-pointer fixed right-10 top-6 z-50 lg:hidden"
          onClick={() => setShowSidebar(true)}
        ></FaBars>
      )}

      <div
        className={` basis-[40%] lg:basis-[21.74%] shadow-[0_0px_10px_6px_rgba(0,0,0,0.2)] lg:shadow-none rounded-tl-3xl rounded-bl-3xl lg:rounded-tl-none lg:rounded-bl-none p-[50px] lg:p-0 top-0 right-0 bottom-0 lg:top-auto lg:right-auto lg:bottom-auto bg-red-600 lg:bg-transparent fixed lg:block lg:translate-x-0 lg:static ease-in-out duration-300 ${
          showSidebar ? "translate-x-0" : "translate-x-[105%]"
        }`}
      >
        <h2 className="text-[48px] mb-6">
          بنك <span className=" text-red-600">الدم</span>
        </h2>
        <div>
          <div className="flex items-center gap-7 mb-8">
            <div className="w-20">
              <img src={pp} className="w-full rounded-full" alt="" />
            </div>
            <div className="text-white lg:text-black text-lg xl:text-2xl">
              <p>مستخدم</p>
              <p>{username}</p>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-5">
              <NavLink
                to="/home/profile"
                className={`flex items-center gap-5 text-xl xl:text-2xl font-semibold`}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <div>
                  <img src={person} className="w-[40px] xl:w-full" alt="" />
                </div>
                بياناتي
              </NavLink>
            </div>
            <div className="flex items-center gap-5">
              <NavLink
                to="/home/DonationHistory"
                className="flex items-center gap-5 text-xl xl:text-2xl font-semibold"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <div>
                  <img src={paper} className="w-[40px] xl:w-full" alt="" />
                </div>
                تاريخ التبرعات
              </NavLink>
            </div>
            <div className="flex items-center gap-5">
              <NavLink
                to="/home/history"
                className="flex items-center gap-5 text-xl xl:text-2xl font-semibold"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <div>
                  <img src={money} className="w-[40px] xl:w-full" alt="" />
                </div>
                الاكثر تبرع
              </NavLink>
            </div>
            <div className="flex items-center gap-5">
              <NavLink
                to="/home/settings"
                className="flex items-center gap-5 text-xl xl:text-2xl font-semibold"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <div>
                  <img src={settings} className="w-[40px] xl:w-full" alt="" />
                </div>
                الاعدادات
              </NavLink>
            </div>
            <div className="flex items-center gap-5">
              <NavLink
                to="/home/history"
                className="flex items-center gap-5 text-xl xl:text-2xl font-semibold"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                <div>
                  <img src={trophy} className="w-[40px] xl:w-full" alt="" />
                </div>
                الانجازات
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Sidebar.defaultProps = {
  username: "احمد محمد",
};

export default Sidebar;
