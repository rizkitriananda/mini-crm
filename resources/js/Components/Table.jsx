import React, { useCallback, useState } from "react";

import Alert from "./Alert";
import { FiPlus } from "react-icons/fi";
import Modal from "./Modal";
import Loading from "./Loading";
import CompanyTable from "@/Pages/dashboard/table/CompanyTable";
import EmployeesTable from "@/Pages/dashboard/table/EmployeesTable";
import UsersTable from "@/Pages/dashboard/table/UsersTable";
import DivisionsTable from "@/Pages/dashboard/table/DivisionsTable";
// import logo from "../../assets/logo.png";

const Table = ({ tableName, reload, btnModal }) => {
    const [pagination, setPagination] = useState({
        // current_page: 1,
        // last_page: 1,
        total: 0,
    });
    const [loading, setLoading] = useState(false);

    // console.log(loading);
    const handleLoading = useCallback((status) => {
        console.log(status);
        setLoading(status);
    });

    function handleHeadTable(headTable) {
        const theadTable = {
            users: ["Name", "Email"],
            companies: ["Logo", "Name", "Email", "Website"],
            employees: ["Name", "Company", "Email", "Phone"],
            divisions: ["Division", "Company", "Member"],
        };

        return theadTable[headTable];
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <main className=" ">
            {/* <Alert action={true} /> */}

            <div className=" relative mt-20">
                <header className="absolute  bg-gradient-to-r from-[#2A2A2A] to-[#474747] h-fit py-5 rounded-xl flex items-center justify-between px-7 inset-10 -top-8 mx-auto z-10">
                    <span className="font-bold text-white md:text-lg">
                        {capitalizeFirstLetter(tableName)} Table
                    </span>

                    <button
                        type="button"
                        className="text-white w-fit h-fit bg-blue-700 flex items-center gap-2 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={btnModal}
                    >
                        <FiPlus size={22} className="hidden md:flex" />
                        <span>Add New</span>
                    </button>
                </header>
                <div className="relative overflow-x-auto w-full rounded-lg bg-white shadow-md z-0 border ">
                    <div className="h-16"></div>

                    <table className="w-full relative text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase border-b-[1px] border-gray-200 bg-white dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-4"></th>

                                {tableName &&
                                    handleHeadTable(tableName).map(
                                        (header, index) => (
                                            <th
                                                scope="col"
                                                className="px-6 py-4"
                                                key={index}
                                            >
                                                {header}
                                            </th>
                                        )
                                    )}

                                <th scope="col" className="px-6 py-4">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        {/* Data table
                        {tableName === "companies" && (
                            <CompanyTable
                                reload={reload}
                                loading={handleLoading}
                            />
                        )} */}

                        {/* {tableName === "employees" && (
                            <EmployeesTable
                                reload={reload}
                                loading={handleLoading}
                            />
                        )}

                        {tableName === "users" && (
                            <UsersTable
                                reload={reload}
                                loading={handleLoading}
                            />
                        )}
                        {tableName === "divisions" && (
                            <DivisionsTable
                                reload={reload}
                                loading={handleLoading}
                            />
                        )} */}
                    </table>

                    <nav
                        className={` flex items-center justify-between p-4 bg-gradient-to-r from-[#2A2A2A] to-[#474747] 
                           
                          `}
                        aria-label="Table navigation"
                    >
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Showing{" "}
                            <span className="font-semibold text-gray-900 dark:text-white">
                                {/* {(pagination.current_page - 1) * 10 + 1}-
                            {Math.min(
                                pagination.current_page * 10,
                                pagination.total
                            )} */}{" "}
                                2
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-gray-900 dark:text-white">
                                {/* {pagination.total} */} 30
                            </span>
                        </span>

                        <ul className="inline-flex -space-x-px text-sm h-8">
                            <li>
                                <button
                                    onClick={() =>
                                        fetchGetData(
                                            pagination.current_page - 1
                                        )
                                    }
                                    // disabled={pagination.current_page === 1}
                                    className="flex items-center justify-center cursor-pointer px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 "
                                >
                                    Previous
                                </button>
                            </li>
                            {/* {[...Array(pagination.last_page)].map((_, i) => ( */}
                            <li
                                key={
                                    // i +
                                    1
                                }
                            >
                                <button
                                    onClick={() => fetchGetData(i + 1)}
                                    // className={`flex items-center justify-center px-3 h-8 leading-tight
                                    //     ${
                                    //         // pagination.current_page ===
                                    //         // //  i+
                                    //         // 1
                                    //             ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    //             : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    //     }
                                    // `}
                                >
                                    {/* {i + 1} */} 2
                                </button>
                            </li>
                            {/* ))} */}
                            <li>
                                <button
                                    // onClick={() =>
                                    //     fetchGetData(pagination.current_page + 1)
                                    // }
                                    // disabled={
                                    //     pagination.current_page ===
                                    //     pagination.last_page
                                    // }
                                    className="flex items-center justify-center cursor-pointer px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            {/* <div className="relative overflow-x-auto sm:rounded-lg bg-white  shadow-lg">
                
              
            </div> */}
        </main>
    );
};

export default Table;
