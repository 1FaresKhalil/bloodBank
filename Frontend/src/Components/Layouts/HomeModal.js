import { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import { AiOutlineClose } from "react-icons/ai";
import Input from "../UI/Input";
import AOS from "aos";
import "aos/dist/aos.css";
import useInput from "../../hooks/useInput";

function HomeModal() {
  const [showModal, setShowModal] = useState(false);
  const [cholestrolMessage, setCholestrolMessage] = useState("");
  const [bloodPressureMessage, setBloodPressureMessage] = useState("");
  const [bloodSugarMessage, setBloodSugarMessage] = useState("");
  const notEmpty = (value) => value.trim() !== "";
  const {
    value: bloodPressureValue,
    isValid: bloodPressureIsValid,
    hasError: bloodPressureHasError,
    valueChangeHandler: bloodPressureChangeHandler,
    inputBlurHandler: bloodPressureBlurHandler,
    reset: resetBloodPressure,
  } = useInput(notEmpty);
  const {
    value: bloodSugarValue,
    isValid: bloodSugarIsValid,
    hasError: bloodSugarHasError,
    valueChangeHandler: bloodSugarChangeHandler,
    inputBlurHandler: bloodSugarBlurHandler,
    reset: resetBloodSugar,
  } = useInput(notEmpty);
  const {
    value: cholestrolValue,
    isValid: cholestrolIsValid,
    hasError: cholestrolHasError,
    valueChangeHandler: cholestrolChangeHandler,
    inputBlurHandler: cholestrolBlurHandler,
    reset: resetCholestrol,
  } = useInput(notEmpty);
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(notEmpty);
  let formIsValid = false;

  if (bloodPressureIsValid && bloodSugarIsValid && cholestrolIsValid) {
    formIsValid = true;
  }

  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
    }, 1500);
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  const handleHealth = (e) => {
    e.preventDefault();
    if (cholestrolValue < 200) {
      setCholestrolMessage(
        <p className="text-green-500 text-sm pt-2">
          مستوى الكوليسترول لديك طبيعي
        </p>
      );
    } else if (cholestrolValue > 200 && cholestrolValue < 239) {
      setCholestrolMessage(
        <p className="text-red-500 text-sm pt-2">
          مستوى الكوليسترول لديك مرتفع للغاية
        </p>
      );
    } else {
      setCholestrolMessage(
        <p className="text-red-500 text-sm pt-2">
          مستوى الكوليسترول لديك مرتفع
        </p>
      );
    }

    if (bloodSugarValue < 140) {
      setBloodSugarMessage(
        <p className="text-green-500 text-sm pt-2">مستوى السكر في الدم طبيعي</p>
      );
    } else if (bloodSugarValue > 140 && bloodSugarValue < 199) {
      setBloodSugarMessage(
        <p className="text-orange-500 text-sm pt-2">
          مستوى السكر في الدم هو مقدمات السكري
        </p>
      );
    } else {
      setBloodSugarMessage(
        <p className="text-red-500 text-sm pt-2">
          مستوى السكر في الدم هو مرض السكري
        </p>
      );
    }

<<<<<<< Updated upstream
    bloodPressureValue
      .split("/")
      .trim()
      .map((element, index) => {
        console.log(element[0]);
      });
=======
    bloodPressureValue.split("/").map((element, index) => {
      if (index === 0) {
        if (element < 120) {
          setBloodPressureMessage(
            <p className="text-green-500 text-sm pt-2">
              مستوى ضغط الدم لديك طبيعي
            </p>
          );
        } else if (element[0] > 90 && element[1] < 120) {
          setBloodPressureMessage(
            <p className="text-blue-500 text-sm pt-2">
              لديك ارتفاع فى مستوى ضغط الدم
            </p>
          );
        } else if (element > 130 && element < 139) {
          setBloodPressureMessage(
            <p className="text-orange-500 text-sm pt-2">
              مستوى ضغط الدم لديك هو المرحلة 1
            </p>
          );
        } else if (element > 140 && element < 180) {
          setBloodPressureMessage(
            <p className="text-red-500 text-sm pt-2">
              مستوى ضغط الدم لديك هو المرحلة الثانية
            </p>
          );
        } else {
          setBloodPressureMessage(
            <p className="text-red-700 text-sm pt-2">
              لديك ارتفاع فى مستوى ضغط الدم
            </p>
          );
        }
      }
    });
>>>>>>> Stashed changes
    if (!formIsValid) {
      return;
    }
    // resetBloodPressure();
    // resetBloodSugar();
    // resetCholestrol();
    // resetFirstName();
  };

  return (
    <div data-aos="fade-up">
      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(!showModal);
          }}
        >
          <div>
            <AiOutlineClose
              onClick={() => setShowModal(!showModal)}
              className="cursor-pointer text-3xl font-bold"
            />
          </div>
          <div className="xl:max-w-[1200px] mx-auto  mt-6 xl:pb-0 ">
            <div className="basis-[92%] lg:basis-1/2">
              <form className="w-4/5 mx-auto" onSubmit={handleHealth}>
                <h1 className="text-center text-3xl mb-4">اعرف صحتك</h1>
                <div className="flex flex-col mb-3">
                  <Input
                    validtion={!firstNameHasError}
                    onChange={firstNameChangeHandler}
                    onBlur={firstNameBlurHandler}
                    label="ادخل اسمك"
                    input={{
                      value: firstNameValue,
                      placeholder: "الاسم",
                      id: "name",
                      type: "text",
                      name: "name",
                    }}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <Input
                    validtion={!bloodSugarHasError}
                    onChange={bloodSugarChangeHandler}
                    onBlur={bloodSugarBlurHandler}
                    label="مستوى السكر"
                    input={{
                      value: bloodSugarValue,
                      placeholder: "130mg/dl",
                      id: "bloodSugar",
                      type: "number",
                      name: "bloodSugar",
                    }}
                  />
                  <div>
                    <p>{bloodSugarMessage}</p>
                  </div>
                </div>
                <div className="flex flex-col mb-4">
                  <Input
                    validtion={!cholestrolHasError}
                    onChange={cholestrolChangeHandler}
                    onBlur={cholestrolBlurHandler}
                    label="مستوى الكوليسترول"
                    input={{
                      value: cholestrolValue,
                      placeholder: "190mg/dl",
                      id: "cholestrol",
                      type: "number",
                      name: "cholestrol",
                    }}
                  />
                  <div>
                    <p>{cholestrolMessage}</p>
                  </div>
                </div>
                <div className="flex flex-col mb-4">
                  <Input
                    validtion={!bloodPressureHasError}
                    onChange={bloodPressureChangeHandler}
                    onBlur={bloodPressureBlurHandler}
                    label="مستوى الضغط"
                    input={{
                      value: bloodPressureValue,
                      placeholder: "90/60mmHg",
                      id: "bloodPressure",
                      type: "text",
                      name: "bloodPressure",
                    }}
                  />
                  <div>
                    <p>{bloodPressureMessage}</p>
                  </div>
                </div>
                <div className="flex mb-4 items-center gender">
                  <Input
                    label="انثى"
                    input={{
                      id: "female",
                      type: "radio",
                      name: "gender",
                    }}
                  />

                  <Input
                    label="ذكر"
                    input={{
                      id: "male",
                      type: "radio",
                      name: "gender",
                    }}
                  />
                </div>
                <button
                  disabled={!formIsValid}
                  type="submit"
                  className="contained-btn w-full disabled:opacity-50"
                >
                  ارسال{" "}
                </button>
              </form>
            </div>
            {/* <div className="hidden lg:block">
        <img className="h-full" src={SignImg} alt="sign-img" />
      </div> */}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default HomeModal;
