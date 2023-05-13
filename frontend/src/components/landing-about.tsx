import { Button } from '@mui/material';
import Link from 'next/link';
import { useTranslation, withTranslation } from 'next-i18next';

const LandingAbout = () => {
  const { t } = useTranslation('common');
  return (
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
          {t('aboutHeader')}
        </h1>
        <p className="text-md md:text-lg lg:text-xl mb-5">
          {t('aboutContent')}
        </p>

        <Button
          variant="contained"
          color="error"
          className="text-lg sm:text-lg"
        >
          <Link className="text-white" href="/register">
            {t('joinUs')}
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default withTranslation('common')(LandingAbout);
