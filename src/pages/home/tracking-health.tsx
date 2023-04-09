import React, { useLayoutEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Input from '@/components/ui/input';
import useInput from '@/hooks/useInput';

type HealthData = {
  name: string;
  BloodPreasure: string;
  Weight: string;
  Sugar: string;
};

type InputProps = {
  placeholder: string;
  id: string;
  type: string;
  name: string;
  value?: string;
};

const TrackingHealth = () => {
  const [showSugar, setShowSugar] = useState(true);
  const [showWeight, setShowWeight] = useState(true);
  const [showBloodPressure, setShowBloodPressure] = useState(true);
  const [healthData, setHealthData] = useState<HealthData[]>([]);
  const [counter, setCounter] = useState(0);
  const notEmpty = (value: string) => value.trim() !== '';

  const {
    value: bloodPressureValue,
    // isValid: bloodPressureIsValid,
    hasError: bloodPressureHasError,
    valueChangeHandler: bloodPressureChangeHandler,
    inputBlurHandler: bloodPressureBlurHandler,
    reset: resetBloodPressure,
  } = useInput(notEmpty);
  const {
    value: sugarValue,
    // isValid: sugarIsValid,
    hasError: sugarHasError,
    valueChangeHandler: sugarChangeHandler,
    inputBlurHandler: sugarBlurHandler,
    reset: resetSugar,
  } = useInput(notEmpty);

  const {
    value: weightValue,
    // isValid: weightIsValid,
    hasError: weightHasError,
    valueChangeHandler: weightChangeHandler,
    inputBlurHandler: weightBlurHandler,
    reset: resetWeight,
  } = useInput(notEmpty);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCounter((prevCounter) => prevCounter + 1);
    const enteredData: HealthData = {
      name: `Day ${counter + 1}`,
      BloodPreasure: bloodPressureValue,
      Weight: weightValue,
      Sugar: sugarValue,
    };
    setHealthData((prevData) => [...prevData, enteredData]);
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

  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  // const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
      // setHeight(containerRef.current.offsetHeight);
    }
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
                input={
                  {
                    value: bloodPressureValue,
                    placeholder: '120/180',
                    id: 'bloodPressure',
                    type: 'number',
                    name: 'bloodPressure',
                  } as InputProps
                }
              />
            </div>
            <div>
              <Input
                validtion={!sugarHasError}
                onChange={sugarChangeHandler}
                onBlur={sugarBlurHandler}
                className={`flex flex-col `}
                label="ادخل مستوي السكر"
                input={
                  {
                    value: sugarValue,
                    placeholder: '140',
                    id: 'bloodSugar',
                    type: 'number',
                    name: 'bloodSugar',
                  } as InputProps
                }
              />
            </div>
            <div>
              <Input
                validtion={!weightHasError}
                onChange={weightChangeHandler}
                onBlur={weightBlurHandler}
                className={`flex flex-col `}
                label=" ادخل وزنك"
                input={
                  {
                    value: weightValue,
                    placeholder: '68Kg',
                    id: 'weight',
                    type: 'number',
                    name: 'weight',
                  } as InputProps
                }
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
