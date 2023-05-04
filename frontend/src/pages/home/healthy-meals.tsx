import axios from 'axios';
// import Image from 'next/image';
// import Link from 'next/link';
import * as React from 'react';
import useSWR from 'swr';

import Navbar from '@/components/app-bar';
import ErrorPage from '@/components/error';

function HealthyMeals() {
  // Fetch profile data using SWR
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
    return <ErrorPage />;
    // console.error(error);
  }

  return (
    <div>
      <Navbar username={data?.user?.username} />
    </div>
  );
}

export default HealthyMeals;
