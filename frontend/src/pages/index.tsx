import Button from '@mui/material/Button';
import Link from 'next/link';

import LandingHeader from '@/components/landing-header';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  return (
    <Main meta={<Meta title="Blood Bank" description="blood bank app" />}>
      <LandingHeader />
      <section className="container sm:flex lg:px-5 md:px-4 px-2 justify-between items-center mx-auto py-12">
        <div className="sm:basis-[40%] mb-5 sm:mb-0">
          <img
            src="/assets/images/BloodDonationAbout.svg"
            alt="about"
            className="w-full"
          />
        </div>
        <div className="basis-1/2">
          <h1 className="text-2xl lg:text-3xl xl:text-4xl mb-5">
            Blood Bank: Where Every Donation Can Save a Life
          </h1>
          <p className="text-md md:text-lg lg:text-xl mb-5">
            Our blood bank is dedicated to providing a safe and sufficient
            supply of blood for emergencies and medical procedures in our
            community. With just an hour of your time, you can make a
            life-saving impact by donating blood. We follow strict protocols to
            ensure the safety of our donors and recipients. Contact us today to
            learn more about donating blood and making a difference in our
            community.
          </p>
          <Link href="/register">
            <Button
              variant="contained"
              color="error"
              href="/register"
              className="text-lg sm:text-lg"
            >
              Join Us
            </Button>
          </Link>
        </div>
      </section>
    </Main>
  );
};

export default Index;
