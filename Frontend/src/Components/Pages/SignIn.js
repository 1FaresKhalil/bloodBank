import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import Navbar from "../UI/LandingNavbar";
import Footer from "../UI/Footer";
import Logo from "../../Assets/images/Logo.png";
import GoogleIcon from "../../Assets/images/google-ic.png";
import SignImg from "../../Assets/images/sign-img.png";

import Input from "../UI/Input";
import useInput from "../../hooks/useInput";

const SignIn = () => {
  const isEmail = (value) => value.includes("@");
  const isPassword = (value) => value.trim() !== "";

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPassword);

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    resetEmail();
    resetPassword();
  };

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  return (
    <div
      data-aos="fade-down"
      className="bg-[#F9F1EF] flex flex-col justify-between h-screen"
    >
      <Navbar data-aos="fade-down" />
      <div className="flex justify-center h-[72vh] lg:justify-between container xl:max-w-[1200px] mx-auto bg-white mt-6 rounded-xl shadow  xl:pb-0 ">
        <div className="basis-[92%] lg:basis-1/2">
          <div>
            <img
              className="max-w-full text-center m-auto"
              src={Logo}
              alt="logo"
            />
          </div>
          <form className="w-4/5 mx-auto" onSubmit={submitHandler}>
            <div className="flex flex-col mb-3">
              <Input
                validtion={!emailHasError}
                onBlur={emailBlurHandler}
                onChange={emailChangeHandler}
                label="البريد الالكتروني"
                input={{
                  value: emailValue,
                  placeholder: "اكتب بريدك الالكتروني",
                  id: "mail",
                  type: "mail",
                  name: "mail",
                }}
              />
            </div>
            <div className="flex flex-col mb-4">
              <Input
                validtion={!passwordHasError}
                onBlur={passwordBlurHandler}
                onChange={passwordChangeHandler}
                label="كلمة المرور"
                input={{
                  value: passwordValue,
                  placeholder: "اكتب كلمة المرور",
                  id: "pass",
                  type: "password",
                  name: "pass",
                }}
              />
            </div>

            <Link to="/home">
              <button
                type="submit"
                className="contained-btn w-full disabled:opacity-50"
                disabled={!formIsValid}
              >
                تسجيل الدخول
              </button>
            </Link>
            <div className="flex flex-col items-center gap-4">
              <span className="pt-5">او</span>
              <button>
                <img src={GoogleIcon} alt="google-icon" />
              </button>
              <p className="text-[#7B809A] text-[14px] pb-4">
                ليس لديك حساب ؟{" "}
                <Link to={"/sign-up"} className="text-red-600">
                  قم بانشاء حساب جديد
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="hidden lg:block">
          <img className="h-full" src={SignImg} alt="sign-img" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
