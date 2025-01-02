import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaBuilding } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { Link } from "@inertiajs/react";
import Breadcrumb from "./Breadcrumb";
export default function Navbar({ locationPage }) {
    const [sideBar, setSideBar] = useState(false);

    const handleSideBar = () => {
        setSideBar(!sideBar);
    };

    function handleGetUrl() {
        const url = window.location.href;
        const getUrl = url.split("/").pop();
        return getUrl;
    }

    return (
        <section className="navbar">
            <nav className="fixed top-0 left-0 md:left-4 w-full md:ml-72 border-b bg-[#F5F7F8] border-gray-200 z-20 ">
                <div className="px-3 py-3 lg:px-5 lg:pl-3 w-full overflow-x-hidden">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                type="button"
                                onClick={() => handleSideBar()}
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                            </button>

                            <span className=" ms-2 md:me-24self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
                                <Breadcrumb locationPage={locationPage} />
                            </span>
                        </div>
                        <div className="flex items-center mr-80">
                            {/* <div className="flex items-center">
                                <div>
                                    <span className="text-black text-lg">
                                        <FaUser />
                                    </span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </nav>

            <aside
                id="logo-sidebar"
                className={`fixed md:top-0 top-16 left-0 bottom-0 z-40 w-full md:w-72 shadow-lg   transition-transform  ${
                    sideBar ? "-translate-x-0" : "-translate-x-full"
                } sm:translate-x-0 "
                `}
            >
                <div className="h-full px-3 pb-4 pt-8 overflow-y-auto md:rounded-r-3xl bg-white w-full  ">
                    <h1 className="text-gray-800 font-bold text-lg text-center  mb-6">
                        Dashboard CRM
                    </h1>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                href="/dashboard/home"
                                className={`flex items-center p-3   rounded-lg  hover:bg-[#2C2C2C] group text-[#6B7280]  ${
                                    handleGetUrl() === "home" &&
                                    "bg-[#2C2C2C] text-white"
                                }`}
                            >
                                <div className=" w-7 flex justify-start">
                                    <AiFillHome
                                        className={` group-hover:text-white `}
                                        size={20}
                                    />
                                </div>
                                <span
                                    className="flex-1 ms-3 text-md whitespace-nowrap font-bold group-hover:text-white
                                    "
                                >
                                    Home
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard/users"
                                className={`flex items-center justify-evenly p-3  rounded-lg text-[#6B7280]  hover:bg-gray-100 dark:hover:bg-[#2C2C2C] group  ${
                                    handleGetUrl() === "users" &&
                                    "bg-[#2C2C2C] text-white"
                                }`}
                            >
                                <div className="w-7  flex justify-start">
                                    <FaUser
                                        className=" group-hover:text-white"
                                        size={20}
                                    />
                                </div>
                                <span className="flex-1 ms-3 text-md whitespace-nowrap  group-hover:text-white ">
                                    Users
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard/companies"
                                className={`flex items-center justify-evenly p-3  rounded-lg text-[#6B7280]  hover:bg-gray-100 dark:hover:bg-[#2C2C2C] group  ${
                                    handleGetUrl() === "companies" &&
                                    "bg-[#2C2C2C] text-white"
                                }`}
                            >
                                <div className="w-7  flex justify-start">
                                    <FaBuilding
                                        className=" group-hover:text-white"
                                        size={20}
                                    />
                                </div>
                                <span className="flex-1 ms-3 text-md whitespace-nowrap  group-hover:text-white ">
                                    Companies
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard/employees"
                                className={`flex items-center p-3 text-[#6B7280] rounded-lg  hover:bg-gray-100 dark:hover:bg-[#2C2C2C] group  ${
                                    handleGetUrl() === "employees" &&
                                    "bg-[#2C2C2C] text-white"
                                }`}
                            >
                                <div className="w-7 flex justify-start ">
                                    <FaUserGroup
                                        className=" group-hover:text-white"
                                        size={20}
                                    />
                                </div>
                                <span className="flex-1 ms-3  text-mdwhitespace-nowrap group-hover:text-white ">
                                    Employees
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard/divisions"
                                className={`flex items-center p-3  rounded-lg  hover:bg-gray-100 dark:hover:bg-[#2C2C2C] group text-[#6B7280]  ${
                                    handleGetUrl() === "divisions" &&
                                    "bg-[#2C2C2C] text-white"
                                }`}
                            >
                                <div className="w-7 flex justify-start">
                                    <IoGrid
                                        className=" group-hover:text-white"
                                        size={20}
                                    />
                                </div>
                                <span className="flex-1 ms-3 text-md whitespace-nowrap group-hover:text-white ">
                                    Divisions
                                </span>
                            </Link>
                        </li>

                        <li>
                            <form
                                method="post"
                                // onSubmit={}
                                action={"/api/logout"}
                                className="flex items-center p-3 text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-[#2C2C2C] group"
                            >
                                <div className="icon  w-7 flex justify-start">
                                    <IoLogOut
                                        className="text-[#6B7280] group-hover:text-white"
                                        size={25}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="flex-1 ms-3 text-md whitespace-nowrap text-left group-hover:text-white text-[#6B7280]"
                                >
                                    Log out
                                </button>
                            </form>
                        </li>
                    </ul>
                </div>
            </aside>
        </section>
    );
}
