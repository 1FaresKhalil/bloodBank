import type { SelectChangeEvent } from '@mui/material';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
// import Link from '@mui/material/Link';
import type { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import useRouter from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
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
      <Link className="text-black" href="/">
        Blood Bank
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const { t } = useTranslation('common');
  const [nameError, setNameError] = React.useState(false);
  const [nameHelperText, setNameHelperText] = React.useState('');

  const [emailError, setEmailError] = React.useState(false);
  const [emailHelperText, setEmailHelperText] = React.useState('');

  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordHelperText, setPasswordHelperText] = React.useState('');

  const [bloodError, setBloodError] = React.useState(false);
  const [bloodHelperText, setBloodHelperText] = React.useState('');

  const router = useRouter;
  const [bloodType, setBloodType] = React.useState('');
  const handleValidation = (field: string, value: string) => {
    if (field === 'name') {
      if (value.trim() === '') {
        setNameError(true);
        setNameHelperText('Name is required');
      } else {
        setNameError(false);
        setNameHelperText('');
      }
    } else if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError(true);
        setEmailHelperText('Please enter a valid email address');
      } else {
        setEmailError(false);
        setEmailHelperText('');
      }
    } else if (field === 'password') {
      if (value.length < 6) {
        setPasswordError(true);
        setPasswordHelperText('Password must be at least 6 characters long');
      } else {
        setPasswordError(false);
        setPasswordHelperText('');
      }
    }
    if (field === 'bloodType') {
      if (value === '') {
        setBloodError(true);
        setBloodHelperText('Please select your blood type');
      } else {
        setBloodError(false);
        setBloodHelperText('');
      }
    }
  };
  const handleChange = (event: SelectChangeEvent) => {
    setBloodType(event.target.value as string);
    if (event.target.value === '') {
      setBloodError(true);
      setBloodHelperText('Please select your blood type');
    } else {
      setBloodError(false);
      setBloodHelperText('');
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    handleValidation('name', name);
    handleValidation('email', email);
    handleValidation('password', password);
    handleValidation('bloodType', bloodType);

    if (nameError || emailError || passwordError || bloodError) {
      return;
    }
    try {
      // Make POST request using Axios
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DB_URI}/admin/signup`,
        {
          name: data.get('name'),
          bloodType: bloodType.toLowerCase() as string,
          username: data.get('email'),
          password: data.get('password'),
        }
      );
      // console.log(response);
      if (response.data.message === 'Successful signup') {
        router.push('/login');
      }
      if (
        response.data.message === 'the username already exists use another one!'
      ) {
        setEmailError(true);
        setEmailHelperText('Email already exists');
      }
      // console.log(response.data); // Handle response data
    } catch (error) {
      // console.error(error); // Handle error
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Main meta={<Meta title="Sign Up" description="sign up" />}>
        <div className="flex flex-col justify-between h-screen ">
          <Container component="main" maxWidth="xs" className="relative">
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
                {t('signUp')}
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      error={nameError}
                      helperText={nameHelperText}
                      onChange={(e) => handleValidation('name', e.target.value)}
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={emailError}
                      helperText={emailHelperText}
                      onChange={(e) =>
                        handleValidation('email', e.target.value)
                      }
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={passwordError}
                      helperText={passwordHelperText}
                      onChange={(e) =>
                        handleValidation('password', e.target.value)
                      }
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel
                        error={bloodError}
                        id="demo-simple-select-label"
                      >
                        Blood Type
                      </InputLabel>
                      <Select
                        error={bloodError}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={bloodType}
                        label="Blood Type"
                        onChange={handleChange}
                      >
                        <MenuItem value={'o-'}>O-</MenuItem>
                        <MenuItem value={'o+'}>O+</MenuItem>
                        <MenuItem value={'a+'}>A+</MenuItem>
                        <MenuItem value={'a-'}>A-</MenuItem>
                        <MenuItem value={'b-'}>B-</MenuItem>
                        <MenuItem value={'b+'}>B+</MenuItem>
                        <MenuItem value={'ab+'}>AB+</MenuItem>
                        <MenuItem value={'ab-'}>AB-</MenuItem>
                      </Select>
                      <FormHelperText error={bloodError}>
                        {bloodError ? bloodHelperText : ''}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive donation requests and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  color="error"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login">Already have an account? Sign in</Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
          <div>
            <Copyright
              className={'my-[20px] text-black font-size-16 '}
              sx={{ mt: 5, mb: 2 }}
            />
          </div>
        </div>
      </Main>
    </ThemeProvider>
  );
}

export async function getStaticProps({ locale = 'en' }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
