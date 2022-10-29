import React from "react";
import pp from "../../Assets/images/me.jpg";
import money from "../../Assets/images/money.png";
import paper from "../../Assets/images/paper.png";
import settings from "../../Assets/images/settings.png";
import person from "../../Assets/images/person.png";
import trophy from "../../Assets/images/trophy.png";

function Sidebar({ username }) {
    return (
        <>
            <div className="navigation w-[24%]">
                <h2 className="text-[48px] mb-6">
                    بنك <span className="text-red-600">الدم</span>
                </h2>
                <div>
                    <div className="flex items-center gap-7 mb-8">
                        <div className="w-20">
                            <img
                                src={pp}
                                className="w-full rounded-full"
                                alt=""
                            />
                        </div>
                        <div className="text-xl">
                            <p>مستخدم</p>
                            <p>{username}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-10">
                        <div className="flex items-center gap-5">
                            <a
                                href="#"
                                className="flex items-center gap-5 text-2xl font-semibold"
                            >
                                <div>
                                    <img
                                        src={person}
                                        className="w-full"
                                        alt=""
                                    />
                                </div>
                                <span className="text-red-600">بياناتى</span>
                            </a>
                        </div>
                        <div className="flex items-center gap-5">
                            <a
                                href="#"
                                className="flex items-center gap-5 text-2xl font-semibold"
                            >
                                <div>
                                    <img
                                        src={paper}
                                        className="w-full"
                                        alt=""
                                    />
                                </div>
                                تاريخ التبرعات
                            </a>
                        </div>
                        <div className="flex items-center gap-5">
                            <a
                                href="#"
                                className="flex items-center gap-5 text-2xl font-semibold"
                            >
                                <div>
                                    <img
                                        src={money}
                                        className="w-full"
                                        alt=""
                                    />
                                </div>
                                الاكثر تبرع
                            </a>
                        </div>
                        <div className="flex items-center gap-5">
                            <a
                                href="#"
                                className="flex items-center gap-5 text-2xl font-semibold"
                            >
                                <div>
                                    <img
                                        src={trophy}
                                        className="w-full"
                                        alt=""
                                    />
                                </div>
                                الانجازات
                            </a>
                        </div>
                        <div className="flex items-center gap-5">
                            <a
                                href="#"
                                className="flex items-center gap-5 text-2xl font-semibold"
                            >
                                <div>
                                    <img
                                        src={settings}
                                        className="w-full"
                                        alt=""
                                    />
                                </div>
                                الاعدادات
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Sidebar.defaultProps = {
    username: "احمد محمد",
};

export default Sidebar;
