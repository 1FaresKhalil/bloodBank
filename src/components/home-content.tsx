// import { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";

// import donate from '../../Assets/images/donate.png';
// import needblood from '../../Assets/images/needblood.png';
// import health from '../../Assets/images/health.png';
import HomeCard from '@/components/ui/homecard';

const HomeContent = () => {
  // useEffect(() => {
  //   AOS.init({
  //     duration: 2000,
  //     once: true,
  //   });
  // }, []);
  return (
    <div
      data-aos="fade-up"
      className="container mx-auto gap-4 mt-4 lg:mt-5 flex flex-col lg:flex-row justify-between lg:h-5/6 px-5 "
    >
      <HomeCard
        bg={'/assets/images/needblood.png'}
        title={`البحث عن متبرع`}
        description={`هنالك العديد من الأنواع المتوفرة
    لنصوص لوريم إيبسومولكن
    هنالك العديد من الأنواع المتوفرة
    ما عبر إدخال بعض النوادر
    أو الكلمات العشوائية`}
        path={'home/need-blood'}
        buttonText={`ابحث عن متبرع`}
      />

      <HomeCard
        bg={'/assets/images/health.png'}
        title={`متابعة صحتك`}
        description={`هنالك العديد من الأنواع المتوفرة
    لنصوص لوريم إيبسومولكن
    هنالك العديد من الأنواع المتوفرة
    ما عبر إدخال بعض النوادر
    أو الكلمات العشوائية`}
        path={'home/tracking-health'}
        buttonText={`تابع صحتك`}
      />

      <HomeCard
        bg={'/assets/images/donate.png'}
        title={`تبرع بالدم`}
        description={`هنالك العديد من الأنواع المتوفرة
    لنصوص لوريم إيبسومولكن
    هنالك العديد من الأنواع المتوفرة
    ما عبر إدخال بعض النوادر
    أو الكلمات العشوائية`}
        buttonText={`تبرع الان`}
        path={'home/donor'}
      />
    </div>
  );
};

export default HomeContent;
