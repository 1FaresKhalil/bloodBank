import '../styles/main.scss';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

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

  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
