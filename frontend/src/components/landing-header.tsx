// import Typography from '@mui/material/Typography';

import LandingNavbar from '@/components/landing-navbar';

const LandingHeader = () => {
  return (
    <header className={'header'}>
      <LandingNavbar />
      <div className={'header-text'}>
        {/* <Typography
          className="text-[20px] lg:text-[2vw]"
          variant="h3"
          component={'h1'}
          gutterBottom
        >
          Save a life
        </Typography> */}
      </div>
    </header>
  );
};
export default LandingHeader;
