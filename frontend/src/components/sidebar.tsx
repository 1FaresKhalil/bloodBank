import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FaBars, FaTimes } from 'react-icons/fa';

// import { Link } from 'react-router-dom';

interface SidebarProps {
  username?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ username = 'احمد محمد' }) => {
  const router = useRouter();
  const isActiveLink = (href: string): boolean => {
    return router.pathname === href;
  };
  const [showSidebar, setShowSidebar] = useState(false);

  let activeStyle: React.CSSProperties;

  if (typeof window !== 'undefined' && window.screen.width < 1024) {
    activeStyle = {
      color: 'white',
    };
  } else {
    activeStyle = {
      color: 'red',
    };
  }
  // @ts-ignore
  return (
    <>
      {showSidebar ? (
        <FaTimes
          onClick={() => setShowSidebar(false)}
          className="fixed text-2xl z-30 flex items-center cursor-pointer right-10 top-6"
        ></FaTimes>
      ) : (
        <FaBars
          className="flex text-2xl text-black items-center cursor-pointer fixed right-10 top-6 z-50 lg:hidden"
          onClick={() => setShowSidebar(true)}
        ></FaBars>
      )}

      <div
        className={` basis-[40%] lg:basis-[21.74%] shadow-[0_0px_10px_6px_rgba(0,0,0,0.2)] lg:shadow-none rounded-l-3xl lg:rounded-l-none p-[50px] lg:p-0 inset-y-0 right-0 lg:inset-y-auto lg:right-auto bg-red-600 lg:bg-transparent fixed lg:block lg:translate-x-0 lg:static ease-in-out duration-300 ${
          showSidebar ? 'translate-x-0' : 'translate-x-[105%]'
        }`}
      >
        <h2 className="text-[48px] mb-6">
          بنك <span className=" text-red-600">الدم</span>
        </h2>
        <div>
          <div className="flex items-center gap-7 mb-8">
            <div className="w-20">
              <img
                src={'/assets/images/me.jpg'}
                className="w-full rounded-full"
                alt=""
              />
            </div>
            <div className="text-white lg:text-black text-lg xl:text-2xl">
              <p>مستخدم</p>
              <p>{username}</p>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-5">
              <Link
                href="/home/profile"
                className={`flex items-center gap-5 text-xl xl:text-2xl font-semibold`}
                // style={isActive ? activeStyle : undefined}
              >
                <div>
                  <img
                    src={'/assets/images/person.png'}
                    className="w-[40px] xl:w-full"
                    alt=""
                  />
                </div>
                بياناتي
              </Link>
            </div>
            <div className="flex items-center gap-5">
              <Link
                href="/home/donation-history"
                className="flex items-center gap-5 text-xl xl:text-2xl font-semibold"
                style={
                  isActiveLink('/home/donation-history')
                    ? activeStyle
                    : undefined
                }
              >
                <div>
                  <img
                    src={'/assets/images/paper.png'}
                    className="w-[40px] xl:w-full"
                    alt=""
                  />
                </div>
                تاريخ التبرعات
              </Link>
            </div>
            <div className="flex items-center gap-5">
              <Link
                href="/home/history"
                className="flex items-center gap-5 text-xl xl:text-2xl font-semibold"
                style={isActiveLink('/home/history') ? activeStyle : undefined}
              >
                <div>
                  <img
                    src={'/assets/images/money.png'}
                    className="w-[40px] xl:w-full"
                    alt=""
                  />
                </div>
                الاكثر تبرع
              </Link>
            </div>
            <div className="flex items-center gap-5">
              <Link
                href="/home/settings"
                className="flex items-center gap-5 text-xl xl:text-2xl font-semibold"
                style={isActiveLink('/home/settings') ? activeStyle : undefined}
              >
                <div>
                  <img
                    src={'/assets/images/settings.png'}
                    className="w-[40px] xl:w-full"
                    alt=""
                  />
                </div>
                الاعدادات
              </Link>
            </div>
            <div className="flex items-center gap-5">
              <Link
                href="/home/achievements"
                className="flex items-center gap-5 text-xl xl:text-2xl font-semibold"
                style={
                  isActiveLink('/home/achievements') ? activeStyle : undefined
                }
              >
                <div>
                  <img
                    src={'/assets/images/trophy.png'}
                    className="w-[40px] xl:w-full"
                    alt=""
                  />
                </div>
                الانجازات
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Sidebar.defaultProps = {
  username: 'احمد محمد',
};

export default Sidebar;
