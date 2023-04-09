import Footer from '@/components/footer';
import HomeContent from '@/components/home-content';
import Navbar from '@/components/navbar';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Home = () => {
  return (
    <Main meta={<Meta title={'App'} description="Lorem ipsum" />}>
      <div className={'h-screen'}>
        <Navbar />
        <HomeContent />
        <Footer />
      </div>
    </Main>
  );
};

export default Home;
