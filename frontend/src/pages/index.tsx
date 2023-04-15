// import { useRouter } from 'next/router';

import LandingHeader from '@/components/landing-header';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  // const router = useRouter();

  return (
    <Main meta={<Meta title="Blood Bank" description="blood bank app" />}>
      <LandingHeader />
      <div>about</div>
    </Main>
  );
};

export default Index;
