// import { useRouter } from 'next/router';

import Login from '@/components/Login';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  // const router = useRouter();

  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <section className="login f main-container grid grid-cols-12 items-center">
        <div className="col-span-12 lg:col-span-6 relative z-10">
          <div className="mb-4 lg:mb-[3.125vw]">
            <img src="/assets/images/logo1.svg" alt="logo" />
          </div>
          <div>
            <h1 className="font-size-64 w-[60%] font-bold">
              Learn <span className="text-green">Today</span> .. Lead Tomorrow
            </h1>
          </div>
        </div>
        <Login className="col-span-12 lg:col-span-6 relative z-10" />
      </section>
    </Main>
  );
};

export default Index;
