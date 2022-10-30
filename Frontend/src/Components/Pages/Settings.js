import React from "react";
import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";
import Sidebar from "../UI/Sidebar";
import { MdModeEdit } from "react-icons/md";

function Settings() {
    return (
        <>
            <Navbar />
            <div className="py-5 flex md:py-2 container px-0 lg:px-5 mx-auto shadow-[0_4px_4px_0_rgba(0,0,0,0.1)] rounded-2xl">
                <Sidebar setting={true} />
                <div className="content w-full">
                    <div className="text-xl flex items-center justify-between pl-5 border-b border-b-dark-grey py-10">
                        <div>
                            <h3>الاسم</h3>
                            <p>احمد محمد</p>
                        </div>
                        <a
                            href="#"
                            className="flex text-white bg-[#FF0000] rounded-xl items-center gap-1 px-[12px] text-[18px] font-normal py-[3px]"
                        >
                            <MdModeEdit color="white" /> تعديل
                        </a>
                    </div>
                    <div className="text-xl flex items-center justify-between pl-5 border-b border-b-dark-grey py-10">
                        <div>
                            <h3>حساب جوجل</h3>
                            <p>ahmedmohamed@gmail.com</p>
                        </div>
                        <a
                            href="#"
                            className="flex text-white bg-[#FF0000] px-[12px] text-[18px] font-normal py-[3px]  rounded-xl items-center gap-1"
                        >
                            <MdModeEdit color="white" /> تعديل
                        </a>
                    </div>
                    <div className="text-xl flex items-center justify-between pl-5 border-b border-b-dark-grey py-10">
                        <div>
                            <h3>الميلاد</h3>
                            <p>20/12/2000</p>
                        </div>
                        <a
                            href="#"
                            className="flex text-white bg-[#FF0000] px-[12px] text-[18px] font-normal py-[3px]  rounded-xl items-center gap-1"
                        >
                            <MdModeEdit color="white" /> تعديل
                        </a>
                    </div>
                    <div className="text-xl flex items-center justify-between pl-5 border-b border-b-dark-grey py-10">
                        <div>
                            <h3>رقم المحمول</h3>
                            <p>+201092126587</p>
                        </div>
                        <a
                            href="#"
                            className="flex text-white bg-[#FF0000] px-[12px] text-[18px] font-normal py-[3px]  rounded-xl items-center gap-1"
                        >
                            <MdModeEdit color="white" /> تعديل
                        </a>
                    </div>
                    <div className="text-xl flex items-center justify-between pl-5 py-5">
                        <div>
                            <h3>المحافظة</h3>
                            <p>الاسكندرية</p>
                        </div>
                        <a
                            href="#"
                            className="flex text-white bg-[#FF0000] px-[12px] text-[18px] font-normal py-[3px]  rounded-xl items-center gap-1"
                        >
                            <MdModeEdit color="white" /> تعديل
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Settings;
