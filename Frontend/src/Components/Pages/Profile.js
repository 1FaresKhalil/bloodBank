import React from "react";
import { useQuery } from "@tanstack/react-query";

import Navbar from "../UI/Navbar";
import { useSelector } from "react-redux";

import Footer from "../UI/Footer";
import Sidebar from "../UI/Sidebar";
import { useProfile } from "../../API/useProfile";

function getFieldData(data, profileStatus) {
  return profileStatus === "success"
    ? data
      ? data
      : "not specified"
    : profileStatus === "loading"
    ? "loading"
    : "error";
}

function Profile({ username }) {
  const isAuth = useSelector((state) => state.auth);
  // console.log(isAuth.userID);

  const { data: profileData, status: profileStatus } = useProfile(
    isAuth.userID
  );

  return (
    <>
      <Navbar />
      <div className="py-5 flex md:py-2 container px-3 lg:px-5 mx-auto shadow-[0_4px_4px_0_rgba(0,0,0,0.1)] rounded-2xl">
        <Sidebar
          username={getFieldData(profileData?.data.user.name, profileStatus)}
        />
        <div className="content w-full">
          <div className="text-lg lg:text-xl xl:text-2xl border-b border-b-dark-grey py-10">
            <h3>الاسم</h3>
            <p>{getFieldData(profileData?.data.user.name, profileStatus)}</p>
          </div>
          <div className="text-lg lg:text-xl xl:text-2xl border-b border-b-dark-grey py-10">
            <h3>حساب جوجل</h3>
            <p>{getFieldData(profileData?.data.user.email, profileStatus)}</p>
          </div>
          {/* <div className="text-lg lg:text-xl xl:text-2xl border-b border-b-dark-grey py-10">
            <h3>الميلاد</h3>
            <p>
              {getFieldData(profileData.data.user.birthDate, profileStatus)}
            </p>
          </div> */}
          <div className="text-lg lg:text-xl xl:text-2xl border-b border-b-dark-grey py-10">
            <h3> تاكيد الحساب</h3>
            <p>
              {getFieldData(profileData?.data.user.verified, profileStatus) ===
              "not specified"
                ? "الحساب غير مفعل"
                : "الحساب مفعل"}
            </p>
          </div>

          <div className="text-lg lg:text-xl xl:text-2xl border-b border-b-dark-grey py-10">
            <h3> فصيله الدم </h3>
            <p>
              {getFieldData(profileData?.data.user.blood_type, profileStatus)}
            </p>
          </div>
          <div className="text-lg lg:text-xl xl:text-2xl border-b border-b-dark-grey py-10">
            <h3>رقم المحمول</h3>
            <p>{getFieldData(profileData?.data.user.phone, profileStatus)}</p>
          </div>
          <div className="text-lg lg:text-xl xl:text-2xl py-5">
            <h3>المحافظة</h3>
            <p>{getFieldData(profileData?.data.user.city, profileStatus)}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
