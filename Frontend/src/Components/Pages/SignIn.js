import Navbar from "../UI/LandingNavbar";
import Footer from "../UI/Footer";
import Logo from "../../Assets/images/Logo.png";
import GoogleIcon from '../../Assets/images/google-ic.png'
import SignImg from '../../Assets/images/sign-img.png'
const SignIn = () => {
  return (
    <div className="bg-[#F9F1EF]">
      <Navbar />
      <div className="flex justify-center lg:justify-between container xl:max-w-[1200px] mx-auto bg-white mt-6 rounded-xl shadow ">
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
              <label
                className="pb-[11px] text-[#7B809A] text-[14px]"
                htmlFor="user"
              >
                اسم المستخدم
              </label>
              <input
                className="pb-[11px] border-b border-[#C7CCD0] placeholder:text-[#C7CCD0] focus:outline-none text-[14px]"
                placeholder="وسام حمدي"
                id="user"
                type="text"
                name="Username"
              />
            </div>
            <div className="flex flex-col py-[15px]">
              <label
                className="pb-[11px] text-[#7B809A] text-[14px]"
                htmlFor="mail"
              >
                البريد الالكتروني
              </label>
              <input
                className="pb-[11px] border-b border-[#C7CCD0] placeholder:text-[#C7CCD0] focus:outline-none text-[14px]"
                placeholder="mrwan@email.com"
                id="mail"
                type="mail"
                name="mail"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="pb-[11px] text-[#7B809A] text-[14px]"
                htmlFor="pass"
              >
                كلمة المرور
              </label>
              <input
                className="pb-[11px] border-b border-[#C7CCD0] placeholder:text-[#C7CCD0] focus:outline-none text-[14px]"
                placeholder="*******************"
                id="pass"
                type="password"
                name="pass"
              />
            </div>
            <div className="flex pb-10 pt-8">
              <input
                id="terms"
                type="checkbox"
                name="accept__terms"
                value="yes"
              />
              <label className="text-red-600 text-[14px] pr-[10px]" htmlFor="terms">أوافق على الشروط والأحكام</label>
            </div>
            <button className="contained-btn w-full ">انشاء حساب</button>
            <div className="flex flex-col items-center gap-4">
              <span className="pt-5">او</span>
              <a href="/"><img src={GoogleIcon} alt="google-icon" /></a>
              <p className="text-[#7B809A] text-[14px] pb-4">هل لديك حساب بالفعل ؟ <a className="text-red-600" href="/"> قم بتسجيل الدخول</a></p>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <img className="h-full" src={SignImg} alt="sign-img" />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default SignIn;
