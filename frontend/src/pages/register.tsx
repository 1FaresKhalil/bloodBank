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
// import Link from '@mui/material/Link';
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
  const router = useRouter;
  const [bloodType, setBloodType] = React.useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
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
      // console.log(response.data); // Handle response data
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setBloodType(event.target.value as string);
    // console.log(bloodType);
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
                Sign up
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
                      <InputLabel id="demo-simple-select-label">
                        Blood Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={bloodType}
                        label="Blood Type"
                        onChange={handleChange}
                      >
                        <MenuItem value={'o'}>O</MenuItem>
                        <MenuItem value={'a+'}>A+</MenuItem>
                        <MenuItem value={'a-'}>A-</MenuItem>
                        <MenuItem value={'b'}>B</MenuItem>
                      </Select>
                      <FormHelperText>
                        Please select your blood type
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
              sx={{ mt: 5 }}
            />
          </div>
        </div>
      </Main>
    </ThemeProvider>
  );
}

// import { Meta } from '@/layouts/Meta';
// import { Main } from '@/templates/Main';

// const Register = () => {
//   return (
//     <Main meta={<Meta title="Sign Up" description="sign up" />}>sign up</Main>
//   );
// };

// export default Register;
