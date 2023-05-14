import '../styles/main.scss';

import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

import Sidebar from '@/components/admin/Sidebar';
import Topbar from '@/components/admin/Topbar';
import { ColorModeContext, useMode } from '@/theme/theme';

interface AdminLayoutProps {
  children: ReactNode;
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const { pathname } = router;
  const routes = pathname.split('/');
  const isAdminPage = routes[1] === 'admin';

  const [theme, colorMode] = useMode();

  useEffect(() => {
    const updateDirection = () => {
      const htmlElement = document.querySelector('html');
      if (htmlElement) {
        const direction = router.locale === 'ar' ? 'rtl' : 'ltr';
        htmlElement.setAttribute('dir', direction);
      }
    };

    updateDirection();
    router.events.on('routeChangeComplete', updateDirection);

    return () => {
      router.events.off('routeChangeComplete', updateDirection);
    };
  }, [router]);

  const AdminLayout = ({ children }: AdminLayoutProps) => {
    return (
      <>
        <Head>
          <style>
            {`
          @import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap");
          html,
          body,
          #root,
          .app,
          .content {
            height: 100%;
            width: 100%;
            font-family: "Source Sans Pro", sans-serif;
          }
          .app {
            display: flex;
            position: relative;
          }
  
          ::-webkit-scrollbar {
            width: 10px;
          }
  
          /* Track */
          ::-webkit-scrollbar-track {
            background: #e0e0e0;
          }
  
          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: #888;
          }
  
          /* Handle on hover */
          ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
          `}
          </style>
        </Head>
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />

            {children}
          </main>
        </div>
      </>
    );
  };

  if (isAdminPage) {
    return (
      <>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AdminLayout>
              <Component {...pageProps} />
            </AdminLayout>
          </ThemeProvider>{' '}
        </ColorModeContext.Provider>
      </>
    );
  }

  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
