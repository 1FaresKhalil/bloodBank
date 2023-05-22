import type { SelectChangeEvent } from '@mui/material';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import type { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import Link from 'next/link';
import * as React from 'react';
import useSWR from 'swr';

import Navbar from '@/components/app-bar';
import ErrorPage from '@/components/error';

function Profile() {
  const { t } = useTranslation('common');
  const [editMode, setEditMode] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [bloodType, setBloodType] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameHelperText, setNameHelperText] = React.useState('');

  const [bloodError, setBloodError] = React.useState(false);
  const [bloodHelperText, setBloodHelperText] = React.useState('');

  // Fetch profile data using SWR
  const { data, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_DB_URI}/website/profile`,
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
      return response.data;
    }
  );

  React.useEffect(() => {
    if (data) {
      // Update the state variables with the fetched data
      setName(data?.user?.name || '');
      setEmail(data?.user?.username || '');
      setBloodType(data?.user?.bloodType || '');
      setPhone(data?.user?.phone || '');
    }
  }, [data]);

  if (error) {
    return <ErrorPage />;
    // console.error(error);
  }

  const handleValidation = (field: string, value: string) => {
    if (field === 'name') {
      if (value.trim() === '') {
        setNameError(true);
        setNameHelperText('Name is required');
      } else {
        setNameError(false);
        setNameHelperText('');
      }
    }
  };

  const editUserHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    handleValidation('name', name);
    handleValidation('bloodType', bloodType);

    if (nameError || bloodError) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_DB_URI}/website/user/profile/update`,
        {
          name,
          username: email,
          bloodType,
          phone,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      // Handle the response as needed
      console.log(response.data);

      // Disable edit mode after successful update
      setEditMode(false);
      mutate();
    } catch (err) {
      // Handle the error
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

  const cancelHandler = () => {
    setName(data?.user?.name);
    setEmail(data?.user?.username);
    setBloodType(data?.user?.bloodType);
    setPhone(data?.user?.phone);
    setEditMode(false);
  };

  if (editMode && data) {
    return (
      <div>
        <Navbar username={data?.user?.username} />
        <ThemeProvider theme={createTheme()}>
          <div className="h-screen flex flex-col justify-between">
            <Container component="main" maxWidth="md">
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
                  {t('profile')}
                </Typography>
                {data && (
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12}>
                      <Card>
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid
                              item
                              xs={12}
                              md={4}
                              className="flex justify-center items-center"
                            >
                              <Avatar
                                sx={{ width: 100, height: 100 }}
                                src={data?.user?.photoURL || ''}
                                alt="Profile Picture"
                              />
                            </Grid>
                            <Grid item xs={12} md={8}>
                              <form onSubmit={editUserHandler}>
                                <Grid
                                  className="flex items-center justify-between gap-2"
                                  sx={{ marginBottom: '15px' }}
                                >
                                  <Button
                                    fullWidth
                                    variant="contained"
                                    type="submit"
                                  >
                                    {t('saveBtn')}
                                  </Button>
                                  <Button
                                    fullWidth
                                    variant="contained"
                                    color="error"
                                    onClick={cancelHandler}
                                  >
                                    {t('cancel')}
                                  </Button>
                                </Grid>
                                <TextField
                                  fullWidth
                                  error={nameError}
                                  helperText={nameHelperText}
                                  onChange={(e) => {
                                    handleValidation('name', e.target.value);
                                    setName(e.target.value);
                                  }}
                                  id="filled-basic"
                                  label={t('userNamePlaceholder')}
                                  value={name}
                                  variant="filled"
                                />
                                <TextField
                                  fullWidth
                                  id="filled-basic"
                                  label={t('emailAddress')}
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  variant="filled"
                                  disabled
                                />
                                <FormControl fullWidth variant="filled">
                                  <InputLabel
                                    error={bloodError}
                                    id="demo-simple-select-label"
                                  >
                                    {t('BloodType')}
                                  </InputLabel>
                                  <Select
                                    error={bloodError}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={bloodType}
                                    label={t('BloodType')}
                                    variant="filled"
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
                                <TextField
                                  fullWidth
                                  id="filled-basic"
                                  label={t('phonePlaceholder')}
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  variant="filled"
                                />
                              </form>

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
  return (
    <div>
      <Navbar username={data?.user?.username} />
      <ThemeProvider theme={createTheme()}>
        <div className="h-screen flex flex-col justify-between">
          <Container component="main" maxWidth="md">
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
                {t('profile')}
              </Typography>
              {data && (
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid
                            item
                            xs={12}
                            md={4}
                            className="flex justify-center items-center"
                          >
                            <Avatar
                              sx={{ width: 100, height: 100 }}
                              src={data?.user?.photoURL || ''}
                              alt="Profile Picture"
                            />
                          </Grid>
                          <Grid item xs={12} md={8}>
                            <FormControl fullWidth variant="filled">
                              <Button
                                sx={{ marginBottom: '15px' }}
                                variant="contained"
                                onClick={() => setEditMode(true)}
                              >
                                {t('edit')}
                              </Button>
                              <TextField
                                label={t('userNamePlaceholder')}
                                id="filled-read-only-input"
                                value={data?.user?.name}
                                InputProps={{
                                  readOnly: true,
                                }}
                                variant="filled"
                              />
                              <TextField
                                label={t('emailAddress')}
                                id="filled-read-only-input"
                                value={data?.user?.username}
                                InputProps={{
                                  readOnly: true,
                                }}
                                variant="filled"
                              />
                              <TextField
                                label={t('BloodType')}
                                id="filled-read-only-input"
                                value={data?.user?.bloodType}
                                InputProps={{
                                  readOnly: true,
                                }}
                                variant="filled"
                              />
                              <TextField
                                label={t('phonePlaceholder')}
                                id="filled-read-only-input"
                                value={
                                  data?.user?.phone
                                    ? data?.user?.phone
                                    : 'Empty'
                                }
                                InputProps={{
                                  readOnly: true,
                                }}
                                variant="filled"
                              />
                            </FormControl>

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
