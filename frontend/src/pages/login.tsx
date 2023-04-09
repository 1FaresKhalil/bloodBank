import Link from 'next/link';

// import { useState } from 'react';
import Footer from '@/components/footer';
import Landingnavbar from '@/components/Landingnavbar';
import Input from '@/components/ui/input';
import useInput from '@/hooks/useInput';

interface InputProps {
  placeholder: string;
  id: string;
  type: string;
  name: string;
  value?: string; // Make the value property optional by adding a question mark (?)
}

const SignIn = () => {
  // const [errorMessage, setErrorMessage] = useState('');
  const isEmail = (value: string) => value.includes('@');
  const isPassword = (value: string) => value.trim() !== '';

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    // reset: resetEmail,
  } = useInput(isEmail);
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    // reset: resetPassword,
  } = useInput(isPassword);

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  return (
    <div
      data-aos="fade-down"
      className="bg-[#F9F1EF] flex flex-col justify-between h-screen"
    >
      <Landingnavbar data-aos="fade-down" />
      <div className="flex justify-center h-[72vh] lg:justify-between container xl:max-w-[1200px] mx-auto bg-white mt-6 rounded-xl shadow  xl:pb-0 ">
        <div className="basis-[92%] lg:basis-1/2">
          <div>
            <img
              className="max-w-full text-center m-auto"
              src={'/assets/images/Logo.png'}
              alt="logo"
            />
          </div>

          {
            //   errorMessage && (
            //   <div
            //     className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            //     role="alert"
            //   >
            //     <span className="block sm:inline">{errorMessage}.</span>
            //     <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            //       <svg
            //         className="fill-current h-6 w-6 text-red-500"
            //         role="button"
            //         xmlns="http://www.w3.org/2000/svg"
            //         viewBox="0 0 20 20"
            //       >
            //         <title>Close</title>
            //         <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            //       </svg>
            //     </span>
            //   </div>
            // )
          }

          <form
            className="w-4/5 mx-auto"
            onSubmit={() => {
              // console.log('submit');
            }}
          >
            <div className="flex flex-col mb-3">
              <Input
                validtion={!emailHasError}
                onBlur={emailBlurHandler}
                onChange={emailChangeHandler}
                label="البريد الالكتروني"
                input={
                  {
                    value: emailValue,
                    placeholder: 'اكتب بريدك الالكتروني',
                    id: 'mail',
                    type: 'mail',
                    name: 'mail',
                  } as InputProps
                }
              />
            </div>
            <div className="flex flex-col mb-4">
              <Input
                validtion={!passwordHasError}
                onBlur={passwordBlurHandler}
                onChange={passwordChangeHandler}
                label="كلمة المرور"
                input={
                  {
                    value: passwordValue,
                    placeholder: 'اكتب كلمة المرور',
                    id: 'pass',
                    type: 'password',
                    name: 'pass',
                  } as InputProps
                }
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
                <img src={'/assets/images/google-ic.png'} alt="google-icon" />
              </button>
              <p className="text-[#7B809A] text-[14px] pb-4">
                ليس لديك حساب ؟{' '}
                <Link href={'/sign-up'} className="text-red-600">
                  قم بانشاء حساب جديد
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="hidden lg:block">
          <img
            className="h-full"
            src={'/assets/images/sign.png'}
            alt="sign-img"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
