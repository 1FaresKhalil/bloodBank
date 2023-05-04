import { Button } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
// import Image from 'next/image';
// import Link from 'next/link';
import * as React from 'react';
import useSWR from 'swr';

import Navbar from '@/components/app-bar';
import ErrorPage from '@/components/error';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type BloodRequest = {
  _id: number;
  patientName: string;
  nearestHospital: string;
  date: string;
  bloodType: string;
};

function Donate() {
  // Fetch profile data using SWR

  const { data: profileData, error: profileError } = useSWR(
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
      return response.data;
    }
  );

  // Fetch blood request data using SWR

  const { data: bloodRequestData } = useSWR(
    `${process.env.NEXT_PUBLIC_DB_URI}/admin/bloodRequest`,
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
      // console.log(response.data);
      return response.data;
    }
  );

  if (profileError) {
    return <ErrorPage />;
  }
  function getCompatibleBloodTypes(bloodType: string): string[] {
    switch (bloodType) {
      case 'a+':
        return ['a+', 'ab+'];
      case 'a-':
        return ['a+', 'a-', 'ab+', 'ab-'];
      case 'b+':
        return ['b+', 'ab+'];
      case 'b-':
        return ['b+', 'b-', 'ab+', 'ab-'];
      case 'ab+':
        return ['ab+'];
      case 'ab-':
        return ['a-', 'b-', 'ab-', 'o-'];
      case 'o+':
        return ['o+', 'a+', 'b+', 'ab+'];
      case 'o-':
        return ['o+', 'o-', 'a+', 'a-', 'b+', 'b-', 'ab+', 'ab-'];
      default:
        return [];
    }
  }

  // console.log(bloodRequestData?.bloodRequests.map((item) => console.log(item)));
  return (
    <Main meta={<Meta title="Donate" description="donate" />}>
      <div className="bg-[#eee] min-h-screen">
        <Navbar username={profileData?.user?.username} />
        <div className="donation-cards main-container grid grid-cols-12 gap-4 my-4 ">
          {bloodRequestData?.bloodRequests
            .filter((item: BloodRequest) => {
              return getCompatibleBloodTypes(
                profileData?.user?.bloodType
              ).includes(item.bloodType);
            })
            .map((item: BloodRequest) => {
              const date = item.date.split(',')[0];
              const [month, day, year] = (date as string).split('-');
              const formattedDate = `${day}/${month}/${year}`;
              return (
                <div
                  // eslint-disable-next-line @typescript-eslint/dot-notation
                  key={item['_id']}
                  className="donation-card col-span-12 lg:col-span-6 bg-white p-5 rounded-md"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <span className="opacity-60 font-size-18 text-stone-900">
                          Patient Name
                        </span>
                        <span className="font-size-21">{item.patientName}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="opacity-60 font-size-18 text-stone-900">
                          Location
                        </span>
                        <span className="font-size-21">
                          {item.nearestHospital.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <span className="opacity-60 font-size-18 text-stone-900">
                          Date Posted
                        </span>
                        <span className="font-size-21">{formattedDate}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="opacity-60 font-size-18 text-stone-900">
                          Blood Type
                        </span>
                        <span className="font-size-21">
                          {item.bloodType.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    sx={{
                      bgcolor: '#ef5350',
                      '&:hover': {
                        backgroundColor: 'error.main',
                      },
                    }}
                    className="font-size-22 "
                    fullWidth
                    variant="contained"
                    color="error"
                    LinkComponent={Link}
                    href="/home"
                  >
                    More Details
                  </Button>
                </div>
              );
            })}
        </div>
      </div>
    </Main>
  );
}

export default Donate;
