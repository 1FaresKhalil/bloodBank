import Link from 'next/link';
import {useState} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {AiOutlineAlignLeft, AiOutlineClose} from 'react-icons/ai';

const Landingnavbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    // const [clicked, setClicked] = useState(false);
    // const [animetion, setAnimetion] = useState(false);
    // const animateAos = !clicked ? props['data-aos'] : '';
    return (
        <nav
            // data-aos={animateAos}
            className={`lg:h-auto lg:container px-5 flex flex-wrap mx-auto pt-1 pb-6 rounded-xl lg:py-0 items-center justify-between w-full text-lg text-gray-700 ${
                showMenu
                    ? 'bg-white h-full content-between fixed lg:static z-10 lg:z-0 transition-opacity'
                    : 'bg-transparent'
            } lg:bg-transparent`}
        >
            <div>
                <Link href={'/'}>
                    <img src={'/assets/images/Logo.png'} alt="logo"/>
                </Link>
            </div>

            <div
                className={`${'animetion' && 'animate-rotate'}`}
                onClick={() => {
                    // setClicked(true);
                    // setAnimetion(true);
                    return !showMenu ? setShowMenu(true) : setShowMenu(false);
                }}
                // onAnimationEnd={() => setAnimetion(false)}
            >
                {showMenu && (
                    <AiOutlineClose className="lg:hidden text-3xl font-bold cursor-pointer self-center"/>
                )}
                {!showMenu && (
                    <AiOutlineAlignLeft className="lg:hidden text-3xl font-bold cursor-pointer self-center"/>
                )}
            </div>

            <div
                className={`${
                    !showMenu ? 'hidden' : ''
                } w-full pb-4 lg:pb-0 lg:flex lg:items-center lg:w-auto`}
                id="menu"
            >
                <ul
                    className="
          transition-all
        text-center
        pt-4
        text-base text-gray-700
        lg:flex
        lg:justify-between
        lg:pt-0"
                >
                    <li className="text-3xl  lg:text-xl">
                        <a
                            onClick={() => {
                                setShowMenu(false);
                            }}
                            className="lg:p-4 py-2 block hover:text-red-600"
                            href="#about"
                        >
                            من نحن
                        </a>
                    </li>
                    <li className="text-3xl  lg:text-xl py-5 lg:py-0">
                        <a
                            onClick={() => {
                                setShowMenu(false);
                            }}
                            className="lg:p-4 py-2 block hover:text-red-600"
                            href="#blood"
                        >
                            عن الدم
                        </a>
                    </li>
                    <li className="text-3xl  lg:text-xl">
                        <a
                            onClick={() => {
                                setShowMenu(false);
                            }}
                            className="lg:p-4 py-2 block hover:text-red-600"
                            href="#contact"
                        >
                            تواصل معنا
                        </a>
                    </li>
                </ul>
            </div>
            <div
                className={`${
                    !showMenu ? 'hidden' : 'w-full lg:w-auto'
                }  flex flex-col lg:flex-row lg:flex  text-center gap-4`}
            >
                <Link href={'/login'} className="outlined-btn py-2 t text-lg ">
                    تسجيل الدخول
                </Link>
                <Link href={'/register'} className="contained-btn py-2 text-lg">
                    حساب جديد
                </Link>
            </div>
        </nav>
    );
};

export default Landingnavbar;
