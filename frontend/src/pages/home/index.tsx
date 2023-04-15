// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import CssBaseline from '@mui/material/CssBaseline';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
import axios from 'axios';
// import Image from 'next/image';
// import Link from 'next/link';
import * as React from 'react';
import useSWR from 'swr';

import Navbar from '@/components/app-bar';

function Home() {
  // Fetch profile data using SWR
  const { data, error } = useSWR(
    'http://localhost:8000/admin/profile',
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
      console.log(response.data.user);
      return response.data;
    }
  );

  if (error) {
    // Handle error
    console.error(error);
  }

  return <Navbar username={data?.user?.username} />;
}

export default Home;
