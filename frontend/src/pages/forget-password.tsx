import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { AxiosError } from 'axios';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import useRouter from 'next/router';
import * as React from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
// create Type for Error response

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

export default function ForgetPassword() {
  const [emailError, setEmailError] = React.useState(false);

  const router = useRouter;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailError(false);

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    try {
      // Make POST request using Axios
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DB_URI}/admin/login`,
        {
          username: email,
          password,
        }
      );
      localStorage.setItem('token', response.data.result.token);
      router.push('/home');
    } catch (error) {
      const axiosError = error as AxiosError; // Add this line
      // Handle error
      if (axiosError.response) {
        setEmailError(true);
      }
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Main
        meta={<Meta title="Forget Password" description="forget password" />}
      >
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
                Forget Password
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  error={emailError}
                  helperText={emailError ? 'Invalid email' : ''}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/login">Go back to Login</Link>
                  </Grid>
                </Grid>
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
