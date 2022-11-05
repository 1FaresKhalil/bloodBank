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
import useInput from "../../hooks/useInput";

const SignUp = () => {
  const isNotEmpty = (value) => value.trim() !== "";
  const isEmail = (value) => value.includes("@");
  const isPassword = (value) => value.trim().length >= 6;
  const isConfrimPassword = (value) =>
    value.trim().length >= 6 && value === passwordValue;
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);
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
  const {
    value: confrimPasswordValue,
    isValid: confrimPasswordIsValid,
    hasError: confrimPasswordHasError,
    valueChangeHandler: confrimPasswordChangeHandler,
    inputBlurHandler: confrimPasswordBlurHandler,
    reset: resetConfrimPassword,
  } = useInput(isConfrimPassword);

  let formIsValid = false;

  if (
    nameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    confrimPasswordIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    resetName();
    resetEmail();
    resetPassword();
    resetConfrimPassword();
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
          <form className="w-4/5 mx-auto" onSubmit={submitHandler}>
            <div className="flex flex-col">
              <InputLine
                validtion={!nameHasError}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                label="اسم المستخدم"
                input={{
                  value: nameValue,
                  placeholder: "وسام حمدي",
                  id: "user",
                  type: "text",
                  name: "username",
                }}
              />
            </div>
            <div className="flex flex-col py-[15px]">
              <InputLine
                validtion={!emailHasError}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                label="البريد الالكتروني"
                input={{
                  value: emailValue,
                  placeholder: "mrwan@email.com",
                  id: "mail",
                  type: "mail",
                  name: "mail",
                }}
              />
            </div>
            <div className="flex flex-col">
              <InputLine
                validtion={!passwordHasError}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                label=";كلمة المرور"
                input={{
                  value: passwordValue,
                  placeholder: "*******************",
                  id: "pass",
                  type: "password",
                  name: "pass",
                }}
              />
            </div>
            <div className="flex flex-col pt-5">
              <InputLine
                validtion={!confrimPasswordHasError}
                onChange={confrimPasswordChangeHandler}
                onBlur={confrimPasswordBlurHandler}
                label=" تاكيد كلمة المرور"
                input={{
                  value: confrimPasswordValue,
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
              disabled={!formIsValid}
              type="submit"
              className="contained-btn w-full disabled:opacity-50 "
            >
              انشاء حساب
            </button>
            <div className="flex flex-col items-center gap-4">
              <span className="pt-5">او</span>
              <button>
                <img src={GoogleIcon} alt="google-icon" />
              </button>
              <p className="text-[#7B809A] text-[14px] pb-4">
                هل لديك حساب بالفعل ؟
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
