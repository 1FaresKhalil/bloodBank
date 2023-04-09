import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

// import DonorImage from '../../Assets/images/donorImage.png';

function Donor() {
  return (
    <div id="donor">
      <Navbar />
      <div className="container flex justify-center lg:justify-between mx-auto mt-[31px] shadow-md pb-[43px] pt-3 pl-3 rounded-xl  ">
        <form className="lg:w-5/12 w-[90%]" action="">
          <div className="text-center">
            <img
              className="m-auto"
              src={'/assets/images/Logo.png'}
              alt="logo"
            />
          </div>
          <div className="wrapper lg:mr-[138px] pt-[7px] text-[18px]">
            <div>
              <label htmlFor="blood">فصيله دمك</label>
              <div className="p-[8px] border-[#D9D9D9] border-solid border-[1px] rounded-xl py-2 mt-1">
                <select className="opacity-[40%]" name="blood" id="blood">
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select>
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="gender">الجنس</label>
              <div className="p-[8px] border-[#D9D9D9] border-solid border-[1px] rounded-xl py-2 mt-1">
                <select className="opacity-[40%]" name="gender" id="gender">
                  <option value="man">ذكر</option>
                  <option value="woman">انثى</option>
                </select>
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="city">المحافظة</label>
              <div className="p-[8px] border-[#D9D9D9] border-solid border-[1px] rounded-xl py-2 mt-1">
                <select className="opacity-[40%]" name="city" id="city">
                  <option value="Alexandria">الاسكندرية</option>
                  <option value="cairo">القاهرة</option>
                  <option value="Alexandria">الاسكندرية</option>
                  <option value="cairo">القاهرة</option>
                  <option value="Alexandria">الاسكندرية</option>
                  <option value="cairo">القاهرة</option>
                  <option value="Alexandria">الاسكندرية</option>
                  <option value="cairo">القاهرة</option>
                  <option value="Alexandria">الاسكندرية</option>
                  <option value="cairo">القاهرة</option>
                </select>
              </div>
            </div>
            <div className="mt-3">
              <label
                htmlFor="Neighborhood
"
              >
                الحى
              </label>
              <div className="p-[8px] border-[#D9D9D9] border-solid border-[1px] rounded-xl pt-1 mt-1">
                <select
                  className="opacity-[40%]"
                  name="Neighborhood
"
                  id="Neighborhood
                  "
                >
                  <option value="Almontazah">المنترة</option>
                  <option value="Agami">العجمى</option>
                  <option value="Almontazah">المنترة</option>
                  <option value="Agami">العجمى</option>
                  <option value="Almontazah">المنترة</option>
                  <option value="Agami">العجمى</option>
                  <option value="Almontazah">المنترة</option>
                  <option value="Agami">العجمى</option>
                  <option value="Almontazah">المنترة</option>
                  <option value="Agami">العجمى</option>
                  <option value="Almontazah">المنترة</option>
                  <option value="Agami">العجمى</option>
                </select>
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="donorName">الاسم للتواصل</label>
              <div className="p-[8px] border-[#D9D9D9] border-solid border-[1px] rounded-xl py-2 mt-1">
                <input
                  id="donorName"
                  type="text"
                  name="donorName"
                  placeholder="مروان طارق"
                />
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="MobileNumber">رقم الهاتف</label>
              <div className="p-[8px] border-[#D9D9D9] border-solid border-[1px] rounded-xl py-2 mt-1">
                <input
                  id="MobileNumber"
                  type={'tel'}
                  placeholder="010123456789"
                  name="teleNumber"
                />
              </div>
            </div>
            <button
              className="w-full bg-red-500 py-[11px] rounded-[20px] text-white mt-10"
              type="submit"
            >
              حفظ
            </button>
          </div>
        </form>
        <div className="lg:w-[54%] lg:block hidden">
          <img
            className="w-full h-full"
            src={'/assets/images/donorImage.png'}
            alt="DonorImage"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Donor;
