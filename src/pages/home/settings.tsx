// import React, { useEffect, useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { MdModeEdit } from 'react-icons/md';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

// function getFieldData(data, profileStatus) {
//     return profileStatus === "success"
//         ? data
//             ? data
//             : "not specified"
//         : profileStatus === "loading"
//             ? "loading"
//             : "error";
// }

function Settings() {
  // const isAuth = useSelector((state) => state.auth);

  // const { data: profileData, status: profileStatus } = useProfile(
  //     isAuth.userID
  // );
  // const [profileDataState, setProfileDataState] = useState({});

  // const [editingModes, setEditingModes] = useState({
  //     name: false,
  //     email: false,
  //     bloodType: false,
  //     phone: false,
  //     city: false,
  // });
  //

  // useEffect(() => {
  //     if (profileData) {
  //         setProfileDataState({ ...profileData.data.user });
  //     }
  // }, [profileData, setProfileDataState]);

  // function handleEditingModeChange(type) {
  //     let temp = { ...editingModes };
  //     temp[type] = !temp[type];
  //
  //     setEditingModes({ ...temp });
  // }

  // function handleDataChange(e) {
  //     let temp = { ...profileDataState };
  //     temp[e.target.name] = e.target.value;
  //
  //     setProfileDataState({ ...temp });
  // }
  // console.log(profileData);
  return (
    <>
      <Navbar />
      <div className="py-5 flex md:py-2 container px-3 lg:px-5 mx-auto shadow-[0_4px_4px_0_rgba(0,0,0,0.1)] rounded-2xl">
        <Sidebar
        // setting={true}
        // username={getFieldData(profileDataState?.name, profileStatus)}
        />
        <div className="content w-full">
          <div className="text-lg lg:text-xl xl:text-2xl flex items-center justify-between pl-5 border-b border-b-dark-grey py-10">
            <div>
              <h3>الاسم</h3>
              {
                //     editingModes.name ? (
                //     <input
                //         className="border-4 border-red-500"
                //         type="text"
                //         name="name"
                //         value={profileDataState?.name}
                //         onChange={handleDataChange}
                //     />
                // ) : (
                //     <p>{getFieldData(profileDataState?.name, profileStatus)}</p>
                // )
              }
            </div>
            <button
              className="flex text-white bg-[#FF0000] rounded-xl items-center gap-1 px-[12px] text-[16px] xl:text-[18px] font-normal py-[3px]"
              onClick={() => {}}
            >
              <MdModeEdit color="white" /> {'حفظ'}
            </button>
          </div>
          <div className="text-lg lg:text-xl xl:text-2xl flex items-center justify-between pl-5 border-b border-b-dark-grey py-10">
            <div>
              <h3>حساب جوجل</h3>
              {
                //     editingModes.email ? (
                //     <input
                //         className="border-4 border-red-500"
                //         type="text"
                //         name="email"
                //         value={profileDataState?.email}
                //         onChange={handleDataChange}
                //     />
                // ) : (
                //     <p>{getFieldData(profileDataState?.email, profileStatus)}</p>
                // )
              }
            </div>
            <button
              className="flex text-white bg-[#FF0000] px-[12px] text-[16px] xl:text-[18px] font-normal py-[3px]  rounded-xl items-center gap-1"
              onClick={() => {}}
            >
              <MdModeEdit color="white" />{' '}
              {
                // editingModes.email ? "حفظ" :
                //     "تعديل"
              }
            </button>
          </div>
          {/* <div className="text-lg lg:text-xl xl:text-2xl flex items-center justify-between pl-5 border-b border-b-dark-grey py-10">
            <div>
              <h3>الميلاد</h3>
              <p>20/12/2000</p>
            </div>
            <button className="flex text-white bg-[#FF0000] px-[12px] text-[16px] xl:text-[18px] font-normal py-[3px]  rounded-xl items-center gap-1">
              <MdModeEdit color="white" /> تعديل
            </button>
          </div> */}
          <div className="text-lg lg:text-xl xl:text-2xl flex items-center justify-between pl-5 border-b border-b-dark-grey py-10">
            <div>
              <h3> تاكيد الحساب</h3>
              <p>
                {
                  //     getFieldData(profileDataState?.verified, profileStatus) ===
                  // "not specified"
                  //     ? "الحساب غير مفعل"
                  //     : "الحساب مفعل"
                }
              </p>
            </div>
            <button className="flex text-white bg-[#FF0000] px-[12px] text-[16px] xl:text-[18px] font-normal py-[3px]  rounded-xl items-center gap-1">
              <MdModeEdit color="white" /> ارسال رساله التفعيل
            </button>
          </div>
          <div className="text-lg lg:text-xl xl:text-2xl flex items-center justify-between pl-5 border-b border-b-dark-grey py-10">
            <div>
              <h3>فصيله الدم</h3>
              {
                <input
                  className="border-4 border-red-500"
                  type="text"
                  name="bloodType"
                  // value={profileDataState?.bloodType}
                  // onChange={handleDataChange}
                />
              }
            </div>
            <button
              className="flex text-white bg-[#FF0000] px-[12px] text-[16px] xl:text-[18px] font-normal py-[3px]  rounded-xl items-center gap-1"
              onClick={() => {}}
            >
              <MdModeEdit color="white" /> {'حفظ'}
            </button>
          </div>
          <div className="text-lg lg:text-xl xl:text-2xl flex items-center justify-between pl-5 border-b border-b-dark-grey py-10">
            <div>
              <h3>رقم المحمول</h3>
              {
                <input
                  className="border-4 border-red-500"
                  type="text"
                  name="phone"
                  // value={profileDataState?.phone}
                  // onChange={handleDataChange}
                />
              }
            </div>
            <button
              className="flex text-white bg-[#FF0000] px-[12px] text-[16px] xl:text-[18px] font-normal py-[3px]  rounded-xl items-center gap-1"
              onClick={() => {}}
            >
              <MdModeEdit color="white" /> {'حفظ'}
            </button>
          </div>
          <div className="text-lg lg:text-xl xl:text-2xl flex items-center justify-between pl-5 py-5">
            <div>
              <h3>المحافظة</h3>
              {
                <input
                  className="border-4 border-red-500"
                  type="text"
                  name="city"
                  // value={profileDataState?.city}
                  // onChange={handleDataChange}
                />
              }
            </div>
            <button
              className="flex text-white bg-[#FF0000] px-[12px] text-[16px] xl:text-[18px] font-normal py-[3px]  rounded-xl items-center gap-1"
              onClick={() => {}}
            >
              <MdModeEdit color="white" />{' '}
              {
                // editingModes.city ? "حفظ" :
                //     "تعديل"
              }
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Settings;