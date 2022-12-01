import React from "react";
import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";
import Sidebar from "../UI/Sidebar";

function Profile({ username }) {
  return (
    <>
      <Navbar />
      <div className="py-5 flex md:py-2 container px-0 lg:px-5 mx-auto shadow-[0_4px_4px_0_rgba(0,0,0,0.1)] rounded-2xl">
        <Sidebar />
        <div className="content w-full">
          <div className="text-xl border-b border-b-dark-grey py-10">
            <h3>الاسم</h3>
            <p>احمد محمد</p>
          </div>
          <div className="text-xl border-b border-b-dark-grey py-10">
            <h3>حساب جوجل</h3>
            <p>ahmedmohamed@gmail.com</p>
          </div>
          <div className="text-xl border-b border-b-dark-grey py-10">
            <h3>الميلاد</h3>
            <p>20/12/2000</p>
          </div>
          <div className="text-xl border-b border-b-dark-grey py-10">
            <h3>رقم المحمول</h3>
            <p>+201092126587</p>
          </div>
          <div className="text-xl py-5">
            <h3>المحافظة</h3>
            <p>الاسكندرية</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
