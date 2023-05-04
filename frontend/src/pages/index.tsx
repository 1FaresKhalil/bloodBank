import { useRouter } from 'next/router';

import Footer from '@/components/footer';
import LandingAbout from '@/components/landing-about';
import LandingHeader from '@/components/landing-header';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  const router = useRouter();
  let token: string | null = '';
  if (typeof window !== 'undefined' && localStorage) {
    token = localStorage.getItem('token');
  }

  if (token) {
    router.replace('/home');
  }
  return (
    <Main meta={<Meta title="Blood Bank" description="blood bank app" />}>
      <LandingHeader />
      <LandingAbout />
      <Footer />
    </Main>
  );
};

export default Index;
