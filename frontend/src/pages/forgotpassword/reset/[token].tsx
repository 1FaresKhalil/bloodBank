import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import useRouter from 'next/router';
import * as React from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link className="text-black " color="inherit" href="/">
        Blood Bank
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Reset() {
  const [message, setMessage] = React.useState('');

  const router = useRouter;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const { token } = router.query;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DB_URI}/admin/resetPassword/${token}`,
        {
          newPassword: data.get('password'),
        }
      );
      console.log(response);
      setMessage(response.data.message);
      router.push('/login');
    } catch (error: any) {
      if (error?.response?.status === 404) {
        setMessage(error.response.data.message);
      } else {
        setMessage(error.response.data.message || error.message);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Main meta={<Meta title="Reset Password" description="Reset Password" />}>
        <div className="h-screen flex flex-col justify-between">
          <Container component="div" maxWidth="xs">
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
                Reset Password
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Reset Password
                </Button>
                <Typography
                  color={
                    message === 'The password reseted successfully'
                      ? 'green'
                      : 'error'
                  }
                  textAlign={'center'}
                  fontWeight={'bold'}
                  fontSize={'h6.fontSize'}
                >
                  {message}
                </Typography>
              </Box>
            </Box>
          </Container>
          <Copyright
            className="text-black font-size-16"
            sx={{ mt: 8, mb: 2 }}
          />
        </div>
      </Main>
    </ThemeProvider>
  );
}
