import Landingnavbar from '@/components/Landingnavbar';

const LandingHeader = () => {
  return (
    <header
      style={{ backgroundImage: `url('assets/images/Background.png')` }}
      className="bg-no-repeat bg-cover h-screen bg-[position:top]"
    >
      <Landingnavbar />
      <div
        // data-aos="fade-up"
        className="flex flex-col justify-center items-center h-1/4"
      >
        <h1 className="text-5xl my-3">تبرع بالدم</h1>
        <h2 className="font-rakkas text-3xl">انقذ حياه انسان</h2>
      </div>
    </header>
  );
};
export default LandingHeader;
