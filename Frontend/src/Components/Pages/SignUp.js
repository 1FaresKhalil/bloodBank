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
import { useState } from "react";

const SignUp = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const signUpUser = async (user) => {
    const res = await fetch("http://localhost:3002/signup", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  };

  const submitHandler = (event) => {
    setSuccessMessage("");
    setErrorMessage("");
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    signUpUser({
      name: nameValue,
      email: emailValue,
      password: passwordValue,
      confirmPassword: confrimPasswordValue,
    }).then((res) => {
      if (res.ok) {
        resetName();
        resetEmail();
        resetPassword();
        resetConfrimPassword();

        setSuccessMessage("User has been registered successfully");
      } else {
        setErrorMessage("Email Already exists !");
      }
    });
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

          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{errorMessage}.</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}
          {successMessage && (
            <div
              className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
              role="alert"
            >
              <p className="text-sm">{successMessage}</p>
            </div>
          )}
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

            <button
              disabled={!formIsValid}
              type="submit"
              className="contained-btn w-full disabled:opacity-50 mt-5"
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
