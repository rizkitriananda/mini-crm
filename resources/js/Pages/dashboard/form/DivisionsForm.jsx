import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import axios from "axios";

export default function DivisionsForm({ onClose, reload, idUpdate, toast }) {
    // console.log(idUpdate);
    const [companyName, setCompanyName] = useState([]);
    const { data, setData, reset } = useForm({
        name_division: "",
        company_id: "",
    });

    // useCallback adalah Hook dari React yang meng-cache/memoize sebuah fungsi
    const handleChange = useCallback(
        // - field: string (nama field yang akan diubah, misal: "name", "email")
        // - value: any (nilai baru untuk field tersebut)
        (field, value) => {
            setData(field, value);
        },
        [setData]
    );

    const getAllCompanyName = async () => {
        try {
            // loading(true);
            const { data } = await axios.get("/api/companies");
            console.log("data fetching.....");
            const companiesData = data.companies;

            // get id and name
            const companyData = companiesData.map((company) => ({
                id: company.id,
                name: company.name,
            }));

            setCompanyName(companyData);
        } catch (error) {
            console.error("Failed to fetch employees:", error);
        } finally {
            // loading(false);
        }
    };

    // fetch detail employee and set input value
    const getDetailDivision = async () => {
        try {
            const { data } = await axios.get(`/api/divisions/${idUpdate}`);
            console.log("data fetching.....");
            setData({
                name_division: data.name_division || "",
                company_id: data.company_id || "",
            });
            console.log(data);
        } catch (error) {
            console.error("Failed to fetch companies:", error);
        } finally {
            // loading(false);
        }
    };

    const submit = async (e) => {
        e.preventDefault();

        // reload();
        try {
            if (idUpdate) {
                await axios.put(`/api/divisions/${idUpdate}`, {
                    name_division: data.name_division,
                    company_id: data.company_id,
                });
            } else {
                await axios.post("/api/divisions", {
                    name_division: data.name_division,
                    company_id: data.company_id,
                });
            }

            reset("first_name", "last_name", "company_id", "email", "phone");
            onClose();
            if (idUpdate) {
                toast("Division updated successfully");
            } else {
                toast("Division added successfully");
            }
            reload();
            // alert();
        } catch (error) {
            console.error("Error:", error.response);
        }
    };

    useEffect(() => {
        getAllCompanyName();
        if (idUpdate) {
            getDetailDivision();
        }
    }, []);

    return (
        <div className="relative  w-full  h-full ">
            <div className="relative  shadow h-full bg-[#F5F7F8]">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 bg-gradient-to-r from-[#2A2A2A] to-[#474747]">
                    <h3 className="text-lg font-semibold text-white ">
                        Add Division
                    </h3>
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={onClose}
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <div className="form  h-full flex justify-center">
                    <form
                        className="p-4 md:p-5 md:py-10 md:px-7 mt-10 bg-white rounded-lg shadow-lg border w-[40rem] h-fit"
                        onSubmit={submit}
                    >
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <InputLabel
                                    htmlFor="name"
                                    value="Name"
                                    className="text-black"
                                />
                                <div className="flex gap-4">
                                    <TextInput
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={data.name_division || ""}
                                        className="mt-1 block w-full focus:border-black focus:ring-black border-gray-500 text-gray-600"
                                        placeholder="Enter the division name"
                                        onChange={(e) =>
                                            handleChange(
                                                "name_division",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="col-span-2 sm:col-span-2">
                                <label
                                    htmlFor="countries"
                                    className="block mb-2 text-sm font-medium text-black"
                                >
                                    Select a Company
                                </label>
                                <select
                                    id="countries"
                                    className="bg-gray-50 border border-gray-500 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={data.company_id || ""} // Set the value to the selected company ID
                                    onChange={(e) =>
                                        handleChange(
                                            "company_id",
                                            e.target.value
                                        )
                                    } // Handle change
                                >
                                    <option value="" disabled>
                                        Select a company
                                    </option>
                                    {/* Optional default option */}
                                    {companyName &&
                                        companyName.map((company) => (
                                            <option
                                                key={company.id}
                                                value={company.id}
                                            >
                                                {company.name}
                                            </option> // Return the option element
                                        ))}
                                </select>
                            </div>
                        </div>
                        <div
                            id="btn-submit"
                            className=" w-full flex justify-end "
                        >
                            <button
                                type="submit"
                                className="text-white inline-flex items-center  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
