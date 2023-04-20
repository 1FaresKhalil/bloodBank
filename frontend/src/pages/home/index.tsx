// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import CssBaseline from '@mui/material/CssBaseline';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
import axios from 'axios';
// import Link from 'next/link';
// import Image from 'next/image';
// import Link from 'next/link';
import * as React from 'react';
import useSWR from 'swr';

import Navbar from '@/components/app-bar';
import ErrorPage from '@/components/error';
import Footer from '@/components/footer';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

function Home() {
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
    // console.error(error);
    return <ErrorPage />;
  }

  return (
    <Main meta={<Meta title="Home" description="homepage" />}>
      <Navbar username={data?.user?.username} />
      <section
        style={{ backgroundImage: "url('/assets/images/header-bg.png')" }}
        className="h-[100vh] bg-no-repeat bg-cover bg-center "
      ></section>
      <div className="absolute bottom-0 left-1/2 translate-x-[-50%]">
        <Footer />
      </div>
    </Main>
  );
}

export default Home;
