import LandingHeader from "../Layouts/LandingHeader";
import LandingAbout from "../Layouts/LandingAbout";
import LandingArticales from "../Layouts/LandingArticales";
import LandingContact from "../Layouts/LandingContact";
import Footer from "../UI/Footer";

const landingPage = () => {
  return (
    <div>
      <LandingHeader />
      <LandingAbout />
      <LandingArticales />
      <LandingContact/>
      <Footer/>
    </div>
  );
};
export default landingPage;
