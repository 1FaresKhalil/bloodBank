import Footer from "../UI/Footer";
import Navbar from "../UI/Navbar";

import chart from "../../Assets/images/chart.png";
import Input from "../UI/Input";
import useInput from "../../hooks/useInput";

const TrackingHealth = () => {
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
    value: sugarValue,
    isValid: sugarIsValid,
    hasError: sugarHasError,
    valueChangeHandler: sugarChangeHandler,
    inputBlurHandler: sugarBlurHandler,
    reset: resetSugar,
  } = useInput(notEmpty);

  const {
    value: weightValue,
    isValid: weightIsValid,
    hasError: weightHasError,
    valueChangeHandler: weightChangeHandler,
    inputBlurHandler: weightBlurHandler,
    reset: resetWeight,
  } = useInput(notEmpty);

  let formIsValid = false;

  if (bloodPressureIsValid && sugarIsValid && weightIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    resetBloodPressure();
    resetSugar();
    resetWeight();
  };

  return (
    <>
      <Navbar />
      <section className="container mx-auto px-2">
        <div className="mx-auto">
          <img className="w-full" src={chart} alt="" />
        </div>

        <form className="flex flex-col" onSubmit={submitHandler}>
          <div className="flex gap-10 justify-between  mb-3">
            <div>
              <Input
                validtion={!bloodPressureHasError}
                onChange={bloodPressureChangeHandler}
                onBlur={bloodPressureBlurHandler}
                className={`flex flex-col ${
                  !bloodPressureHasError ? "bg-slate-100" : "bg-red-100"
                }`}
                label="ادخل ضغط الدم"
                input={{
                  value: bloodPressureValue,
                  placeholder: "120/180",
                  id: "bloodPressure",
                  type: "number",
                  name: "bloodPressure",
                }}
              />
            </div>
            <div>
              <Input
                validtion={!sugarHasError}
                onChange={sugarChangeHandler}
                onBlur={sugarBlurHandler}
                className={`flex flex-col ${
                  !sugarHasError ? "bg-slate-100" : "bg-red-100"
                }`}
                label="ادخل مستوي السكر"
                input={{
                  value: sugarValue,
                  placeholder: "140",
                  id: "bloodSugar",
                  type: "number",
                  name: "bloodSugar",
                }}
              />
            </div>
            <div>
              <Input
                validtion={!weightHasError}
                onChange={weightChangeHandler}
                onBlur={weightBlurHandler}
                className={`flex flex-col ${
                  !weightHasError ? "bg-slate-100" : "bg-red-100"
                }`}
                label=" ادخل وزنك"
                input={{
                  value: weightValue,
                  placeholder: "68Kg",
                  id: "weight",
                  type: "number",
                  name: "weight",
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={!formIsValid}
            className=" mt-4 contained-btn px-9 py-2 self-center disabled:opacity-50"
          >
            حفظ
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default TrackingHealth;
