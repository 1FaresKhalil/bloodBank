import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';

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
    return (
      <Main meta={<Meta title="Blood Bank" description="blood bank app" />}>
        <LandingHeader />
        <LandingAbout />
        <Footer />
      </Main>
    );
    // console.error(error);
  }
  if (data) {
    router.replace('/home');
  }
  return (
    <Main meta={<Meta title="Blood Bank" description="blood bank app" />}>
      <div>redirecting...</div>
    </Main>
  );
};

export default Index;
