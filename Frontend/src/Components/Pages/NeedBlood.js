import React from "react";
import Navbar from "../UI/Navbar";
import Logo from "../../Assets/images/Logo.png";
import Footer from "../UI/Footer";
function NeedBlood() {
  const bloodRequestSubmit = async (data) => {
    const res = await fetch("http://localhost:3002/blood-request", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  };
  const bloodHandler = (e) => {
    let bloodNeed = e.target.value;
    return bloodNeed;
  };
  const cityHandler = (e) => {
    let city = e.target.value;
    return city;
  };
  const districtHandler = (e) => {
    let district = e.target.value;
    return district;
  };
  bloodRequestSubmit({
    blood: bloodHandler,
    city: cityHandler,
    district: districtHandler,
  }).then((res) => {
    console.log(res);
  });
  return (
    <div id="Need-blood">
      <Navbar />
      <div className="container mx-auto min-h-[749px] shadow-md rounded-[10px] flex justify-center pt-[117px]">
        <form action="" onSubmit={bloodRequestSubmit}>
          <div className="text-center">
            <img className="m-auto" src={Logo} alt="logo" />
          </div>
          <div className="mt-8">
            <label className="text-center w-full block" htmlFor="blood">
              فصيله الدم اللي تحتاج اليها
            </label>
            <div className="p-[8px] border-[#D9D9D9] border-solid border-[1px] rounded-xl py-2 mt-1 w-[318px] max-w-full">
              <select
                onChange={bloodHandler}
                className="opacity-[40%]"
                name="blood"
                id="blood"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
              </select>
            </div>
          </div>
          <div className="mt-3">
            <label className="text-center w-full block" htmlFor="city">
              المحافظة
            </label>
            <div className="p-[8px] border-[#D9D9D9] border-solid border-[1px] rounded-xl py-2 mt-1">
              <select
                className="opacity-[40%]"
                name="city"
                id="city"
                onChange={cityHandler}
              >
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
                <option value="Alexandria">الاسكندرية</option>
                <option value="cairo">القاهرة</option>
                <option value="Alexandria">الاسكندرية</option>
                <option value="cairo">القاهرة</option>
              </select>
            </div>
          </div>
          <div className="mt-3 mb-8">
            <label
              className="text-center w-full block"
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
                onChange={districtHandler}
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
          <button
            className="block mx-auto bg-red-500 py-[6px] px-[29px] rounded-[20px] text-white mt-10"
            type="submit"
          >
            بحث
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default NeedBlood;
