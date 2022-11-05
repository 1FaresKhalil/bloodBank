import { useEffect, useState } from "react";
import AOS from "aos";
import { AiOutlineClose } from "react-icons/ai";
import "aos/dist/aos.css";

import ContactImage from "../../Assets/images/contact-background.png";

import Modal from "../UI/Modal";
import Input from "../UI/Input";
const LandingContact = () => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);
  return (
    <div
      id="contact"
      data-aos="fade-up"
      style={{ backgroundImage: `url(${ContactImage})` }}
      className="min-h-[525px] mt-24 bg-no-repeat bg-cover bg-[position:left] "
    >
      <div className="container px-5 mx-auto pt-12 md:pt-0">
        <h2 className="text-3xl md:text-5xl pt-[75px] max-w-[300px] text-red-600 sm:text-black sm:max-w-[508px] leading-[1.5]">
          تواصل معنا اذا كنت تحتاج الى المساعدة
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="outlined-btn bg-white mt-[44px] px-8"
        >
          تواصل معنا
        </button>
        {showModal && (
          <Modal
            onClose={() => {
              setShowModal(!showModal);
            }}
          >
            <div>
              <AiOutlineClose
                onClick={() => setShowModal(!showModal)}
                className="cursor-pointer text-3xl font-bold"
              />
            </div>
            <div className="xl:max-w-[1200px] mx-auto  mt-6 xl:pb-0 ">
              <div className="basis-[92%] lg:basis-1/2">
                <form className="w-4/5 mx-auto">
                  <div className="flex flex-col mb-3">
                    <Input
                      label="اكتب اسمك"
                      input={{
                        placeholder: "الاسم",
                        id: "name",
                        type: "text",
                        name: "name",
                      }}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <Input
                      label="اكتب بريدك الالكتروني"
                      input={{
                        placeholder: "البريد الاكتروني",
                        id: "email",
                        type: "email",
                        name: "email",
                      }}
                    />
                  </div>
                  <div className="flex flex-col mb-3">
                    <label for="message" className="text-[#7B809A]">
                      اكتب رسالتك
                    </label>

                    <textarea
                      className="py-3 px-3 border rounded-lg placeholder:text-[#7B809A] border-[#C7CCD0] focus:outline-none text-[14px] "
                      placeholder="الرسالة"
                      id="message"
                      name="message"
                      rows="4"
                      cols="50"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="contained-btn w-full disabled:opacity-50"
                  >
                    ارسال{" "}
                  </button>
                </form>
              </div>
              {/* <div className="hidden lg:block">
                <img className="h-full" src={SignImg} alt="sign-img" />
              </div> */}
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};
export default LandingContact;
