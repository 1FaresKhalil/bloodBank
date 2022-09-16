import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import Navbar from "../UI/LandingNavbar";
import Footer from "../UI/Footer";
import Logo from "../../Assets/images/Logo.png";
import GoogleIcon from "../../Assets/images/google-ic.png";
import SignImg from "../../Assets/images/sign-img.png";
import InputLine from "../UI/InputLine";
const SignUp = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);
  return (
    <div
      data-aos="fade-down"
      className="bg-[#F9F1EF] flex flex-col justify-between "
    >
      <Navbar data-aos="fade-down" />
      <div className="flex justify-center lg:justify-between container xl:max-w-[1200px] mx-auto bg-white mt-6 rounded-xl shadow pb-3 xl:pb-0 ">
        <div className="basis-[92%] lg:basis-1/2">
          <div>
            <img
              className="max-w-full text-center m-auto"
              src={Logo}
              alt="logo"
            />
          </div>
          <div className="w-4/5 mx-auto">
            <div className="flex flex-col">
              <InputLine
                label="اسم المستخدم"
                input={{
                  placeholder: "وسام حمدي",
                  id: "user",
                  type: "text",
                  name: "username",
                }}
              />
            </div>
            <div className="flex flex-col py-[15px]">
              <InputLine
                label="البريد الالكتروني"
                input={{
                  placeholder: "mrwan@email.com",
                  id: "mail",
                  type: "mail",
                  name: "mail",
                }}
              />
            </div>
            <div className="flex flex-col">
              <InputLine
                label=";كلمة المرور"
                input={{
                  placeholder: "*******************",
                  id: "pass",
                  type: "password",
                  name: "pass",
                }}
              />
            </div>
            <div className="flex pb-10 pt-8">
              <input
                id="terms"
                type="checkbox"
                name="accept__terms"
                value="yes"
              />
              <label
                className="text-red-600 text-[14px] pr-[10px]"
                htmlFor="terms"
              >
                أوافق على الشروط والأحكام
              </label>
            </div>
            <button className="contained-btn w-full ">انشاء حساب</button>
            <div className="flex flex-col items-center gap-4">
              <span className="pt-5">او</span>
              <button>
                <img src={GoogleIcon} alt="google-icon" />
              </button>
              <p className="text-[#7B809A] text-[14px] pb-4">
                هل لديك حساب بالفعل ؟
                <Link to={"sign-in"} className="text-red-600">
                  قم بتسجيل الدخول
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <img className="h-full" src={SignImg} alt="sign-img" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
