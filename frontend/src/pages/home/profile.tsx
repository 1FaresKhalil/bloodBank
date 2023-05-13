import { Avatar, Card, CardContent, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import type { GetStaticPropsContext } from 'next';
import Image from 'next/image';
// import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import Link from 'next/link';
import * as React from 'react';
import useSWR from 'swr';

import Navbar from '@/components/app-bar';
import ErrorPage from '@/components/error';

function Profile() {
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
      <ThemeProvider theme={createTheme()}>
        <div className="h-screen flex flex-col justify-between">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Image
                width={100}
                height={100}
                src={'/assets/images/logo.png'}
                alt="logo"
              />
              <Typography component="h1" variant="h5">
                Profile
              </Typography>
              {data && (
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={4}>
                            <Avatar
                              sx={{ width: 100, height: 100 }}
                              src={data?.user?.photoURL || ''}
                              alt="Profile Picture"
                            />
                          </Grid>
                          <Grid item xs={12} md={8}>
                            <Typography variant="body1">
                              Name: {data?.user?.name}
                            </Typography>
                            <Typography variant="body1">
                              Email: {data?.user?.username}
                            </Typography>
                            <Typography variant="body1">
                              Blood-type: {data?.user?.bloodType}
                            </Typography>
                            {/* Render other profile data */}
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Container>
          <Box sx={{ mt: 8, mb: 4 }} component="footer">
            {/* Render footer */}
          </Box>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default Profile;
export async function getStaticProps({ locale = 'en' }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
