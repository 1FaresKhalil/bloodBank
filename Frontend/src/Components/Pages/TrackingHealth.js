import React, { PureComponent, useRef, useState, useLayoutEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Footer from "../UI/Footer";
import Navbar from "../UI/Navbar";

import chart from "../../Assets/images/chart.png";
import Input from "../UI/Input";
import useInput from "../../hooks/useInput";
const data = [
  {
    name: "First Weak",
    BloodPreasure: 4000,
    Weight: 2400,
    Sugar: 4345,
  },
  {
    name: "Second Weak",
    BloodPreasure: 3000,
    Weight: 1398,
    Sugar: 4345,
  },
  {
    name: "Third Weak",
    BloodPreasure: 2000,
    Weight: 9800,
    Sugar: 4345,
  },
  {
    name: "Fourth Weak",
    BloodPreasure: 2780,
    Weight: 3908,
    Sugar: 4345,
  },
  {
    name: "Fifth Weak",
    BloodPreasure: 1890,
    Weight: 4800,
    Sugar: 4345,
  },
  {
    name: "Sixth Weak",
    BloodPreasure: 2390,
    Weight: 3800,
    Sugar: 4345,
  },
  {
    name: "Seventh Weak",
    BloodPreasure: 3490,
    Weight: 4300,
    Sugar: 4345,
  },
];

const TrackingHealth = () => {
  const [showSugar, setShowSugar] = useState(true);
  const [showWeight, setShowWeight] = useState(true);
  const [showBloodPressure, setShowBloodPressure] = useState(true);
  const [healthData, setHealthData] = useState([]);
  const [counter, setCounter] = useState(0);
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

    // if (!formIsValid) {
    //   return;
    // }
    //make counter for the healthData array and add the data to the array

    setCounter((prevCounter) => prevCounter + 1);
    const enterdData = {
      name: `Day ${counter + 1}`,
      BloodPreasure: bloodPressureValue,
      Weight: weightValue,
      Sugar: sugarValue,
    };
    setHealthData((prevData) => {
      return [...prevData, enterdData];
    });
    resetBloodPressure();
    resetSugar();
    resetWeight();
  };
  const sugarClickHandler = () => {
    setShowSugar(true);
    setShowWeight(false);
    setShowBloodPressure(false);
  };
  const weightClickHandler = () => {
    setShowSugar(false);
    setShowWeight(true);
    setShowBloodPressure(false);
  };
  const bloodPressureClickHandler = () => {
    setShowSugar(false);
    setShowWeight(false);
    setShowBloodPressure(true);
  };
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setWidth(containerRef.current.offsetWidth);
    setHeight(containerRef.current.offsetHeight);
  }, []);

  return (
    <>
      <Navbar />
      <section ref={containerRef} className="container mx-auto px-2">
        <LineChart
          width={width}
          height={600}
          data={healthData}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickLine={false} tickMargin={43} />
          <Tooltip />
          <Legend />
          {showBloodPressure && (
            <Line dataKey="BloodPreasure" stroke="#8884d8" strokeWidth={2} />
          )}
          {showSugar && (
            <Line dataKey="Sugar" stroke="#82ca9d" strokeWidth={2} />
          )}
          {showWeight && (
            <Line dataKey="Weight" stroke="#ff2340" strokeWidth={2} />
          )}
        </LineChart>
        <div className="text-center flex gap-6 justify-center my-4">
          <button className="outlined-btn" onClick={bloodPressureClickHandler}>
            ضغط الدم
          </button>
          <button className="outlined-btn" onClick={sugarClickHandler}>
            مستوي السكر
          </button>
          <button className="outlined-btn" onClick={weightClickHandler}>
            الوزن
          </button>
        </div>
        <form className="flex flex-col" onSubmit={submitHandler}>
          <div className="flex flex-col mr-2 lg:mr-0 lg:flex-row gap-10 justify-between  mb-3">
            <div>
              <Input
                validtion={!bloodPressureHasError}
                onChange={bloodPressureChangeHandler}
                onBlur={bloodPressureBlurHandler}
                className={`flex flex-col `}
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
                className={`flex flex-col `}
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
                className={`flex flex-col `}
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
