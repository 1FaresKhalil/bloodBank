import Footer from '@/components/footer';
import LandingAbout from '@/components/landing-about';
import LandingHeader from '@/components/landing-header';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  return (
    <Main meta={<Meta title="Blood Bank" description="blood bank app" />}>
      <LandingHeader />
      <LandingAbout />
      <Footer />
    </Main>
  );
};

export default Index;
