// import { useRouter } from 'next/router';

// import Login from '@/components/login';
import Footer from '@/components/footer';
import LandingContact from '@/components/landing-contact';
import LandingAbout from '@/components/landingabout';
import LandingArticales from '@/components/landingarticals';
import LandingHeader from '@/components/landingheader';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  // const router = useRouter();

  return (
    <Main meta={<Meta title="7ayet" description="blood bank app" />}>
      <LandingHeader />
      <LandingAbout />
      <LandingArticales />
      <LandingContact />
      <Footer />
    </Main>
  );
};

export default Index;
