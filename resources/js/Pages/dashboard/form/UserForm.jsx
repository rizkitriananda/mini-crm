import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import axios from "axios";
import InputError from "@/Components/InputError";

export default function UserForm({ onClose, reload, toast }) {
    const [error, setError] = useState([]);
    const { data, setData, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
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

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "/api/users",
                {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    password_confirmation: data.password_confirmation,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // reloadData("tes");
            console.log("User  created successfully:", response.data);
            reset("name", "email", "website", "logo");
            onClose();

            toast("User added successfully");

            reload();
        } catch (error) {
            console.error("Error:", error.response.data);
            setError(error.response.data);
        }
    };

    useEffect(() => {
        console.log(error);
    }, [error]);

    return (
        <div className="relative  w-full  h-full ">
            <div className="relative  shadow h-full bg-[#F5F7F8]">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 bg-gradient-to-r from-[#2A2A2A] to-[#474747]">
                    <h3 className="text-lg font-semibold text-white ">
                        Add User
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

                                <TextInput
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full focus:border-black focus:ring-black border-gray-500 text-gray-600"
                                    placeholder="Enter the  username"
                                    onChange={(e) =>
                                        handleChange("name", e.target.value)
                                    }
                                />
                            </div>

                            <div className="col-span-2">
                                <InputLabel
                                    htmlFor="email"
                                    value="Email"
                                    className="text-black"
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full focus:border-black focus:ring-black border-gray-500 text-gray-600"
                                    placeholder="example@com"
                                    onChange={(e) =>
                                        handleChange("email", e.target.value)
                                    }
                                />

                                <InputError
                                    message={
                                        error.errors?.email &&
                                        error.errors.email
                                    }
                                    className="mt-2"
                                />
                            </div>

                            <div className="col-span-2">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="text-black"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full focus:border-black focus:ring-black  border-gray-500 text-gray-600"
                                    placeholder="Enter a password"
                                    onChange={(e) =>
                                        handleChange("password", e.target.value)
                                    }
                                />
                            </div>
                            <div className="col-span-2">
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                    className="text-black"
                                />

                                <TextInput
                                    type="password"
                                    name="password_confirmation"
                                    id="password_confirmation"
                                    className="mt-1 block w-full  focus:border-black focus:ring-black border-gray-500 text-gray-600"
                                    placeholder="Confirm your password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        handleChange(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                />

                                <InputError
                                    message={
                                        error.errors?.password &&
                                        error.errors.password
                                    }
                                    className="mt-2"
                                />
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
