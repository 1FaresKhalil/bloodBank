import { Button, TextField } from '@mui/material';
import axios from 'axios';
import type { GetStaticPropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import useSWR from 'swr';

import Navbar from '@/components/app-bar';
import ErrorPage from '@/components/error';
import Footer from '@/components/footer';
import useInput from '@/hooks/useInput';

type HealthData = {
  name: string;
  Systolic: any;
  Diastolic: any;
  Weight: any;
  Sugar: any;
};
const isValidBloodPressure = (value: string) => {
  const regex = /^\d{1,3}\/\d{1,3}$/;
  return regex.test(value);
};

const separateBloodPressure = (value: string) => {
  const [systolic, diastolic] = value.split('/').map(Number);
  return { systolic, diastolic };
};

const TrackingHealth = () => {
  const { t } = useTranslation('common');
  const [showSugar, setShowSugar] = useState(true);
  const [showWeight, setShowWeight] = useState(true);
  const [showBloodPressure, setShowBloodPressure] = useState(true);
  const [healthData, setHealthData] = useState<HealthData[]>([]);
  const [counter, setCounter] = useState(0);
  const notEmpty = (value: string) => value.trim() !== '';

  const {
    value: bloodPressureValue,
    valueChangeHandler: bloodPressureChangeHandler,
    inputBlurHandler: bloodPressureBlurHandler,
    reset: resetBloodPressure,
  } = useInput(isValidBloodPressure);
  const {
    value: sugarValue,
    // isValid: sugarIsValid,

    valueChangeHandler: sugarChangeHandler,
    inputBlurHandler: sugarBlurHandler,
    reset: resetSugar,
  } = useInput(notEmpty);

  const {
    value: weightValue,
    // isValid: weightIsValid,

    valueChangeHandler: weightChangeHandler,
    inputBlurHandler: weightBlurHandler,
    reset: resetWeight,
  } = useInput(notEmpty);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // If no input is provided, do not submit the form
    if (
      !isValidBloodPressure(bloodPressureValue) &&
      !notEmpty(sugarValue) &&
      !notEmpty(weightValue)
    ) {
      return;
    }

    setCounter((prevCounter) => prevCounter + 1);

    // Initialize values with null to allow for partial data submission
    let systolic = null;
    let diastolic = null;
    if (isValidBloodPressure(bloodPressureValue)) {
      const separatedValues = separateBloodPressure(bloodPressureValue);
      systolic = separatedValues.systolic;
      diastolic = separatedValues.diastolic;
    }

    const enteredData: HealthData = {
      name: `Day ${counter + 1}`,
      Systolic: systolic,
      Diastolic: diastolic,
      Weight: notEmpty(weightValue) ? weightValue : null,
      Sugar: notEmpty(sugarValue) ? sugarValue : null,
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
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_DB_URI}/admin/profile`,
    async (url) => {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `${token}`,
        },
      });
      // console.log(response.data.user);
      return response.data;
    }
  );

  if (error) {
    // console.error(error);
    return <ErrorPage />;
  }
  return (
    <>
      <Navbar username={data?.user?.username} />
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
            <>
              <Line dataKey="Systolic" stroke="#82ca9d" strokeWidth={2} />
              <Line dataKey="Diastolic" stroke="#8884d8" strokeWidth={2} />
            </>
          )}

          {showSugar && (
            <Line dataKey="Sugar" stroke="#82ca9d" strokeWidth={2} />
          )}
          {showWeight && (
            <Line dataKey="Weight" stroke="#ff2340" strokeWidth={2} />
          )}
        </LineChart>
        <div className="text-center flex gap-6 justify-center my-4">
          <Button
            color="error"
            variant="outlined"
            className="outlined-btn"
            onClick={bloodPressureClickHandler}
          >
            {t('trackingBloodPreasure')}
          </Button>
          <Button
            color="error"
            variant="outlined"
            className="outlined-btn"
            onClick={sugarClickHandler}
          >
            {t('sugarLevel')}
          </Button>
          <Button
            color="error"
            variant="outlined"
            className="outlined-btn"
            onClick={weightClickHandler}
          >
            {t('weight')}
          </Button>
        </div>
        <form className="flex flex-col" onSubmit={submitHandler}>
          <div className="flex flex-col mr-2 lg:mr-0 lg:flex-row gap-10 justify-between  mb-3">
            <div>
              <TextField
                onChange={bloodPressureChangeHandler}
                onBlur={bloodPressureBlurHandler}
                className={`flex flex-col `}
                label={t('enterBloodPreasure')}
                inputProps={{
                  value: bloodPressureValue,
                  placeholder: '120/80',
                  id: 'bloodPressure',
                  type: 'text',
                  name: 'bloodPressure',
                }}
              />
            </div>
            <div>
              <TextField
                onChange={sugarChangeHandler}
                onBlur={sugarBlurHandler}
                className={`flex flex-col `}
                label={t('enterSugarLevel')}
                inputProps={{
                  value: sugarValue,
                  placeholder: '140',
                  id: 'bloodSugar',
                  type: 'number',
                  name: 'bloodSugar',
                }}
              />
            </div>
            <div>
              <TextField
                onChange={weightChangeHandler}
                onBlur={weightBlurHandler}
                className={`flex flex-col `}
                label={t('enterWeight')}
                inputProps={{
                  value: weightValue,
                  placeholder: '68Kg',
                  id: 'weight',
                  type: 'number',
                  name: 'weight',
                }}
              />
            </div>
          </div>
          <Button
            variant="contained"
            color="error"
            type="submit"
            className=" mt-4 contained-btn px-9 py-2 self-center disabled:opacity-50"
          >
            {t('saveBtn')}
          </Button>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default TrackingHealth;
export async function getStaticProps({ locale = 'en' }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
