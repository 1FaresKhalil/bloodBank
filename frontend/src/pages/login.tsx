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
import type { AxiosError } from 'axios';
import axios from 'axios';
import type { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

// import LanguageSwitcher from '@/components/language-switcher';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
// create Type for Error response

function Copyright(props: any) {
  const { t } = useTranslation('common');
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {t('copyright')}
      <Link className="text-black" href="/">
        {t('projectName')}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const { t } = useTranslation('common');
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailError(false);
    setPasswordError(false);

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
      // console.log(router.locale);
      router.push('/home');
    } catch (error) {
      const axiosError = error as AxiosError; // Add this line
      // Handle error
      if (axiosError.response) {
        setEmailError(true);
        setPasswordError(true);
      }
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Main meta={<Meta title="Login" description="login" />}>
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
              {/* <LanguageSwitcher /> */}
              <Typography component="h1" variant="h5">
                {t('signIn')}
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
                  label={t('EmailPlaceholder')}
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  error={passwordError}
                  helperText={passwordError ? 'Invalid password' : ''}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={t('passwordPlaceholder')}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label={t('rememberMe')}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {t("signIn")}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/forget-password">{t('forgotPassword')}</Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register">
                      {t('doNotHaveAccount')}
                    </Link>
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
export async function getStaticProps({ locale = 'en' }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
