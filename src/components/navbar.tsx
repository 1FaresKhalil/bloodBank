import Link from 'next/link';
import React from 'react';
import { IoChatbox, IoLogOut, IoNotifications } from 'react-icons/io5';

const Navbar = () => {
  // const [clicked, setClicked] = useState(false);
  // const animateAos = !clicked ? dataAos : '';

  return (
    <nav
      // data-aos={animateAos}
      className="lg:h-auto lg:container px-5 flex mx-auto pt-1 pb-6 rounded-xl lg:py-0 items-center justify-between w-full text-lg text-gray-700 "
    >
      <div className="hidden lg:block">
        <Link href="/index">
          <img src="/assets/images/Logo.png" alt="logo" />
        </Link>
      </div>

      <div className="mr-auto mt-2 lg:mt-0 lg:mr-0 flex justify-between items-center gap-5 rounded-[80px] bg-[#F3E1E1] pr-1 lg:pr-4">
        <div className="flex justify-between items-center gap-2  ">
          <Link href="/">
            <button className="rounded-full bg-[#F24E1E] p-2 text-center">
              <IoLogOut className="text-white text-lg" />
            </button>
          </Link>
          <button className="rounded-full bg-[#F24E1E] p-2 text-center">
            <IoChatbox className="text-white text-lg" />
          </button>
          <button className="rounded-full bg-[#F24E1E] p-2 text-center">
            <IoNotifications className="text-white text-lg" />
          </button>
        </div>
        <div className="flex">
          <button>
            <img src="/assets/images/profile.png" alt="profile" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
