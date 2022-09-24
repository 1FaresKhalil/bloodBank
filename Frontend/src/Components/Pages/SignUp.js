import { useEffect, useState } from "react";
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
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfrimPassword, setEnteredConfirmPassword] = useState("");
  const [enteredUser, setEnteredUser] = useState("");
  // valdition
  const [userIsvaild, setUserIsvaild] = useState();
  const [emailIsvaild, setEmailIsvaild] = useState();
  const [passwordIsvaild, setPasswordIsvaild] = useState();
  const [confirmPasswordIsvaild, setConfirmPasswordIsvaild] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const userHandler = (event) => {
    setEnteredUser(event.target.value);
  };
  const emailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setEnteredPassword(event.target.value);
  };
  const confirmPasswordHandler = (event) => {
    setEnteredConfirmPassword(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
  };
  const emailValidHandler = () => {
    setEmailIsvaild(enteredEmail.includes("@"));
  };
  const userValidHandler = () => {
    setUserIsvaild(enteredUser.trim().length > 6);
  };
  const passwordValidHandler = () => {
    setPasswordIsvaild(enteredPassword.trim().length > 6);
  };
  const confrimPasswordValidHandler = () => {
    setConfirmPasswordIsvaild(
      enteredPassword.trim().length > 6 &&
        enteredPassword === enteredConfrimPassword
    );
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
        enteredEmail.includes("@") &&
          enteredPassword.trim().length > 6 &&
          enteredConfrimPassword.trim().length > 6 &&
          enteredUser.trim().length > 6 &&
          enteredPassword === enteredConfrimPassword
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword, enteredConfrimPassword, enteredUser]);

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
            <div className="flex flex-col">
              <InputLine
                validtion={userIsvaild}
                onBlur={userValidHandler}
                onChange={userHandler}
                label="اسم المستخدم"
                input={{
                  value: enteredUser,
                  placeholder: "وسام حمدي",
                  id: "user",
                  type: "text",
                  name: "username",
                }}
              />
            </div>
            <div className="flex flex-col py-[15px]">
              <InputLine
                validtion={emailIsvaild}
                onBlur={emailValidHandler}
                onChange={emailHandler}
                label="البريد الالكتروني"
                input={{
                  value: enteredEmail,
                  placeholder: "example@email.com",
                  id: "mail",
                  type: "mail",
                  name: "mail",
                }}
              />
            </div>
            <div className="flex flex-col">
              <InputLine
                validtion={passwordIsvaild}
                onBlur={passwordValidHandler}
                onChange={passwordHandler}
                label="كلمة المرور"
                input={{
                  value: enteredPassword,
                  placeholder: "*******************",
                  id: "pass",
                  type: "password",
                  name: "pass",
                }}
              />
            </div>
            <div className="flex flex-col pt-5">
              <InputLine
                validtion={confirmPasswordIsvaild}
                onBlur={confrimPasswordValidHandler}
                onChange={confirmPasswordHandler}
                label=" تاكيد كلمة المرور"
                input={{
                  value: enteredConfrimPassword,
                  placeholder: "*******************",
                  id: "confrim_pass",
                  type: "password",
                  name: "confrim_pass",
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
            <button
              type="submit"
              className="contained-btn w-full disabled:opacity-50"
              disabled={!formIsValid}
            >
              انشاء حساب
            </button>
            <div className="flex flex-col items-center gap-4 pb-4">
              <span className="pt-5">او</span>
              <button>
                <img src={GoogleIcon} alt="google-icon" />
              </button>
              <p className="text-[#7B809A] text-[14px] pb-4">
                هل لديك حساب بالفعل ؟{" "}
                <Link to={"/sign-in"} className="text-red-600">
                  قم بتسجيل الدخول
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

export default SignUp;
