import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import Navbar from "../UI/LandingNavbar";
import Footer from "../UI/Footer";
import Logo from "../../Assets/images/Logo.png";
import GoogleIcon from "../../Assets/images/google-ic.png";
import SignImg from "../../Assets/images/sign-img.png";

import Input from "../UI/Input";

const SignIn = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  // valdition

  const [emailIsvaild, setEmailIsvaild] = useState();
  const [passwordIsvaild, setPasswordIsvaild] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const emailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };
  const emailValidHandler = () => {
    setEmailIsvaild(enteredEmail.includes("@"));
  };

  const passwordValidHandler = () => {
    setPasswordIsvaild(enteredPassword.trim().length > 6);
  };

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);

  return (
    <div
      data-aos="fade-down"
      className="bg-[#F9F1EF] flex flex-col justify-between "
    >
      <Navbar data-aos="fade-down" />
      <div className="flex justify-center lg:justify-between container xl:max-w-[1200px] mx-auto bg-white mt-6 rounded-xl shadow  xl:pb-0 ">
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
                validtion={emailIsvaild}
                onBlur={emailValidHandler}
                onChange={emailHandler}
                label="البريد الالكتروني"
                input={{
                  value: enteredEmail,
                  placeholder: "اكتب بريدك الالكتروني",
                  id: "mail",
                  type: "mail",
                  name: "mail",
                }}
              />
            </div>
            <div className="flex flex-col mb-4">
              <Input
                validtion={passwordIsvaild}
                onBlur={passwordValidHandler}
                onChange={passwordHandler}
                label="كلمة المرور"
                input={{
                  value: enteredPassword,
                  placeholder: "اكتب كلمة المرور",
                  id: "pass",
                  type: "password",
                  name: "pass",
                }}
              />
            </div>

            <button
              type="submit"
              className="contained-btn w-full disabled:opacity-50"
              disabled={!formIsValid}
            >
              تسجيل الدخول
            </button>
            <div className="flex flex-col items-center gap-4">
              <span className="pt-5">او</span>
              <button>
                <img src={GoogleIcon} alt="google-icon" />
              </button>
              <p className="text-[#7B809A] text-[14px] pb-4">
                ليس لديك حساب ؟{" "}
                <Link to={"sign-in"} className="text-red-600">
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
