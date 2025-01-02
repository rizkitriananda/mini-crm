import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import axios from "axios";
import BlueButton from "@/Components/BlueButton";

export default function EmployeesForm({ onClose, reload, idUpdate, alert }) {
    // console.log(idUpdate);
    const [companies, setCompanies] = useState([]);
    const [detailCompany, setDetailCompany] = useState([]);
    const { data, setData, reset } = useForm({
        first_name: "",
        last_name: "",
        company_id: "",
        divisions_id: "",
        email: "",
        phone: "",
    });

    // useCallback adalah Hook dari React yang meng-cache/memoize sebuah fungsi
    const handleChange = useCallback(
        (field, value) => {
            setData(field, value);
        },
        [setData]
    );

    // fetch data company dan return company name and company id
    const getAllCompany = async () => {
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

            // console.log(companiesData);

            setCompanies(companyData);
        } catch (error) {
            console.error("Failed to fetch employees:", error);
        } finally {
            // loading(false);
        }
    };

    const getDetailCompany = async (id) => {
        if (!id) return; // Pastikan id ada

        try {
            const response = await axios.get(`/api/companies/${id}`);
            const companyData = response.data;

            console.log(companyData);
            // Ambil hanya divisi yang relevan
            setDetailCompany(companyData.division); // Pastikan ini sesuai dengan struktur data API
        } catch (error) {
            console.error("Failed to fetch company details:", error);
        }
    };

    // handle action if idUpdate is true
    useEffect(() => {
        if (idUpdate) {
            console.log(idUpdate);
            getDetailEmployee();
        } else {
            reset("first_name", "last_name", "company_id", "email", "phone");
        }
    }, [idUpdate]);

    // fetch detail employee and set input value
    const getDetailEmployee = async () => {
        try {
            const { data } = await axios.get(`/api/employees/${idUpdate}`);
            console.log("data fetching.....");
            setData({
                first_name: data.first_name || "",
                last_name: data.last_name || "",
                company_id: data.company_id || "",
                divisions_id: data.divisions_id || "",
                email: data.email || "",
                phone: data.phone || "",
            });
            console.log(data);
        } catch (error) {
            console.error("Failed to fetch companies:", error);
        } finally {
            // loading(false);
        }
    };

    //  if idUpdate is true fetch for update data else create new data
    const submit = async (e) => {
        e.preventDefault();

        reload();
        try {
            if (idUpdate) {
                await axios.put(`/api/employees/${idUpdate}`, {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    company_id: data.company_id,
                    divisions_id: data.divisions_id,
                    email: data.email,
                    phone: data.phone,
                });
            } else {
                await axios.post("/api/employees", {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    company_id: data.company_id,
                    divisions_id: data.divisions_id,
                    email: data.email,
                    phone: data.phone,
                });
            }

            reset("first_name", "last_name", "company_id", "email", "phone");
            onClose();
            if (idUpdate) {
                alert("Employee updated successfully");
            } else {
                alert("Employee added successfully");
            }
        } catch (error) {
            console.error("Error:", error.response);
        }
    };

    // fetch getAllCompanyName setiap form di load
    useEffect(() => {
        getAllCompany();
    }, []);

    useEffect(() => {
        if (data.company_id) {
            getDetailCompany(data.company_id);
        }
    }, [data.company_id]);

    console.log("Data yang akan dikirim:", {
        first_name: data.first_name,
        last_name: data.last_name,
        company_id: data.company_id,
        divisions_id: data.divisions_id,
        email: data.email,
        phone: data.phone,
    });

    return (
        <div className="relative  w-full  h-full ">
            <div className="relative  shadow h-full bg-[#F5F7F8]">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 bg-gradient-to-r from-[#2A2A2A] to-[#474747]">
                    <h3 className="text-lg font-semibold text-white ">
                        {idUpdate ? "Update" : "Add"} Employee
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
                                        name="frist_name"
                                        id="frist_name"
                                        className="mt-1 block w-full focus:border-black focus:ring-black border-gray-500 text-gray-600"
                                        placeholder="First name"
                                        value={data.first_name}
                                        onChange={(e) =>
                                            handleChange(
                                                "first_name",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                    <TextInput
                                        type="text"
                                        name="last_name"
                                        id="last_name"
                                        className="mt-1 block w-full focus:border-black focus:ring-black border-gray-500 text-gray-600"
                                        placeholder="Last name"
                                        value={data.last_name}
                                        onChange={(e) =>
                                            handleChange(
                                                "last_name",
                                                e.target.value
                                            )
                                        }
                                        required
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
                                    value={data.company_id} // Set the value to the selected company ID
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
                                    {companies &&
                                        companies.map((company) => (
                                            <option
                                                key={company.id}
                                                value={company.id}
                                            >
                                                {company.name}
                                            </option> // Return the option element
                                        ))}
                                </select>
                            </div>
                            <div className="col-span-2 sm:col-span-2">
                                <label
                                    htmlFor="countries"
                                    className="block mb-2 text-sm font-medium text-black"
                                >
                                    Select a Division
                                </label>
                                <select
                                    id="divisions"
                                    className="bg-gray-50 border border-gray-500 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={data.divisions_id} // Set the value to the selected company ID
                                    onChange={(e) =>
                                        handleChange(
                                            "divisions_id",
                                            e.target.value
                                        )
                                    } // Handle change
                                >
                                    <option value="" disabled>
                                        Select a company
                                    </option>
                                    {/* Optional default option */}
                                    {detailCompany &&
                                        detailCompany.map((division) => (
                                            <option
                                                key={division.id}
                                                value={division.id}
                                            >
                                                {division.name_division}
                                            </option> // Return the option element
                                        ))}
                                </select>
                            </div>
                            <div className="col-span-2">
                                <InputLabel
                                    htmlFor="email"
                                    value="Email"
                                    className="text-black"
                                />
                                <TextInput
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="mt-1 block w-full focus:border-black focus:ring-black  border-gray-500 text-gray-600"
                                    placeholder="example@com"
                                    value={data.email}
                                    onChange={(e) =>
                                        handleChange("email", e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="col-span-2">
                                <InputLabel
                                    htmlFor="phone"
                                    value="Phone"
                                    className="text-black"
                                />

                                <TextInput
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    className="mt-1 block w-full focus:border-black focus:ring-black border-gray-500 text-gray-600"
                                    placeholder="08xxxxxxxxxx"
                                    value={data.phone}
                                    onChange={(e) =>
                                        handleChange("phone", e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div
                            id="btn-submit"
                            className=" w-full flex justify-end "
                        >
                            <BlueButton type="submit">Submit</BlueButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
