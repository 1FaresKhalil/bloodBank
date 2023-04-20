import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import useSWR from 'swr';

import Navbar from '@/components/app-bar';
import ErrorPage from '@/components/error';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const theme = createTheme();

export default function SignInSide() {
  let token: string | null = '';
  if (typeof window !== 'undefined' && localStorage) {
    token = localStorage.getItem('token');
  }
  const router = useRouter();
  const [bloodType, setBloodType] = React.useState('');
  const [hospital, setHospital] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DB_URI}/admin/bloodRequest`,
        {
          patientName: data.get('name'),
          bloodType: bloodType.toLowerCase() as string,
          address: data.get('address'),
          nearestHospital: hospital.toLowerCase() as string,
          done: false,
          phone: data.get('phone'),
          note: data.get('note'),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.message === 'Blood request created successfully') {
        router.push('/home/success-request');
      }
    } catch (error) {
      console.error(error); // Handle error here
    }
  };
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_DB_URI}/admin/profile`,
    async (url) => {
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
    <ThemeProvider theme={theme}>
      <Main
        meta={<Meta title="Blood Request" description="make a blood request" />}
      >
        <Navbar username={data?.user?.username} />
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url("/assets/images/header.jpg")',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light'
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
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
                Submit a Blood Request
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  className="my-2"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Patient Name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  autoFocus
                />
                <TextField
                  className="my-2"
                  margin="normal"
                  required
                  fullWidth
                  inputProps={{
                    maxLength: 11,
                  }}
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  autoComplete="phone"
                  autoFocus
                />
                <TextField
                  className="my-2"
                  margin="normal"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  type="text"
                  autoComplete="address"
                  autoFocus
                />
                <FormControl fullWidth required className="my-2">
                  <InputLabel id="demo-simple-select-label">
                    Blood Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={bloodType}
                    label="Blood Type"
                    onChange={(e) => setBloodType(e.target.value)}
                  >
                    <MenuItem value={'o'}>O</MenuItem>
                    <MenuItem value={'a+'}>A+</MenuItem>
                    <MenuItem value={'a-'}>A-</MenuItem>
                    <MenuItem value={'b'}>B</MenuItem>
                  </Select>
                  <FormHelperText>Please select your blood type</FormHelperText>
                </FormControl>
                <FormControl fullWidth required className="my-2">
                  <InputLabel id="demo-simple-select-label">
                    Nearest Hospital
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={hospital}
                    label="Nearest Hospital"
                    onChange={(e) => setHospital(e.target.value)}
                  >
                    <MenuItem value={'elandlosya'}>ElAndlosya</MenuItem>
                    <MenuItem value={'alexu-hospital'}>
                      Alexandria University Hospital
                    </MenuItem>
                    <MenuItem value={'mabaret-alasafra'}>
                      Mabaret Alasafra
                    </MenuItem>
                    <MenuItem value={'shraq-medena'}>Shraq Elmedina</MenuItem>
                  </Select>
                  <FormHelperText>
                    Please select your nearest hospital to you
                  </FormHelperText>
                </FormControl>
                <TextField
                  className="my-2"
                  margin="normal"
                  required
                  fullWidth
                  id="note"
                  type="text"
                  label="Note"
                  name="note"
                  autoComplete="note"
                  autoFocus
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit Blood Request
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Main>
    </ThemeProvider>
  );
}
