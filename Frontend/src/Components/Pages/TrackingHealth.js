import React, { PureComponent, useRef, useState, useLayoutEffect } from "react";
import {
  BarChart,
  Bar,
  Cell,
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
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
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
        <BarChart
          width={width}
          height={600}
          data={data}
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
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>

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
