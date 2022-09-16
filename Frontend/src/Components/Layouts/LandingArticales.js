import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Card from "../UI/Card";
import article1 from "../../Assets/images/article1.png";
const LandingArticales = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);
  return (
    <div id="blood" data-aos="fade-up" className=" container mx-auto px-8">
      <h2 className="text-center text-2xl md:text-3xlg lg:text-5xl text-red-500 my-5 lg:my-10">
        التبرع بالدم ينقذ المزيد من الأرواح
      </h2>
      <div className="flex flex-col mt-10 lg:mt-0 lg:flex-row gap-5">
        <Card
          photo={article1}
          title={"عنوان المقال"}
          content={
            "هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات العشوائية إلى النص. إن كنت تريد أن تستخدم نص لوريم إيبسوم ما، عليك أن تتحقق أولاً أن ليس هناك أي كلمات"
          }
          btnContnet={"الاطلاع عن المزيد"}
        ></Card>
        <Card
          photo={article1}
          title={"عنوان المقال"}
          content={
            "هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات العشوائية إلى النص. إن كنت تريد أن تستخدم نص لوريم إيبسوم ما، عليك أن تتحقق أولاً أن ليس هناك أي كلمات"
          }
          btnContnet={"الاطلاع عن المزيد"}
        ></Card>{" "}
        <Card
          photo={article1}
          title={"عنوان المقال"}
          content={
            "هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات العشوائية إلى النص. إن كنت تريد أن تستخدم نص لوريم إيبسوم ما، عليك أن تتحقق أولاً أن ليس هناك أي كلمات"
          }
          btnContnet={"الاطلاع عن المزيد"}
        ></Card>
      </div>
    </div>
  );
};

export default LandingArticales;
