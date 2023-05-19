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
import type { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import useSWR from 'swr';

import Navbar from '@/components/app-bar';
import ErrorPage from '@/components/error';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const theme = createTheme();

export default function SignInSide() {
  const { t } = useTranslation('common');
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
        `${process.env.NEXT_PUBLIC_DB_URI}/website/bloodRequest`,
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
      // console.error(error); // Handle error here
    }
  };
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_DB_URI}/website/profile`,
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
              backgroundColor: (color) =>
                color.palette.mode === 'light'
                  ? color.palette.grey[50]
                  : color.palette.grey[900],
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
                {t('submitBloodRequest')}
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
                  label={t('patientName')}
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
                  label={t('phonePlaceholder')}
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
                  label={t('addressPlaceholder')}
                  name="address"
                  type="text"
                  autoComplete="address"
                  autoFocus
                />
                <FormControl fullWidth required className="my-2">
                  <InputLabel id="demo-simple-select-label">
                    {t('BloodType')}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={bloodType}
                    label="Blood Type"
                    onChange={(e) => setBloodType(e.target.value)}
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
                  <FormHelperText>{t('selectBloodType')}</FormHelperText>
                </FormControl>
                <FormControl fullWidth required className="my-2">
                  <InputLabel id="demo-simple-select-label">
                    {t('nearestHospital')}
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
                  <FormHelperText>{t('selectNearestHospital')}</FormHelperText>
                </FormControl>
                <TextField
                  className="my-2"
                  margin="normal"
                  required
                  fullWidth
                  id="note"
                  type="text"
                  label={t('notePlaceholder')}
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
                  {t('submitBloodRequest')}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
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
