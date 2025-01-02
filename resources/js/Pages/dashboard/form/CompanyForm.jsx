import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import axios from "axios";
import InputError from "@/Components/InputError";

export default function CompanyForm({ onClose, reload, idUpdate, alert }) {
    const [error, setError] = useState([]);
    const [preview, setPreview] = useState(null); // State untuk menyimpan URL pratinjau
    const { data, setData, reset } = useForm({
        name: "",
        email: "",
        website: "",
        logo: null,
    });

    const handleChange = useCallback(
        (field, value) => {
            setData(field, value);
        },
        [setData]
    );

    useEffect(() => {
        if (idUpdate) {
            getDetailCompany();
        } else {
            reset("name", "email", "website", "logo");
            setPreview(null); // Reset preview saat form direset
        }
    }, [idUpdate]);

    const getDetailCompany = async () => {
        try {
            const { data } = await axios.get(`/api/companies/${idUpdate}`);
            setData({
                name: data.name || "",
                email: data.email || "",
                website: data.website || "",
                logo: data.logo || "",
            });
            setPreview(`/storage/${data.logo}`); // Set pratinjau jika ada logo
        } catch (error) {
            console.error("Failed to fetch companies:", error);
            setError(error.response.data);
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("website", data.website);
        if (data.logo) {
            formData.append("logo", data.logo); // Tambahkan logo jika ada
        }

        try {
            if (idUpdate) {
                await axios.put(`/api/companies/${idUpdate}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } else {
                await axios.post("/api/companies", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            }
            reset();
            setPreview(null); // Reset preview after submission
            onClose();
            alert(
                idUpdate
                    ? "Company updated successfully"
                    : "Company added successfully"
            );
            reload();
        } catch (error) {
            console.error("Error:", error);
            setError(error.response.data);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Ambil file yang dipilih
        if (file && file.type.startsWith("image/")) {
            setData("logo", file); // Simpan file jika itu adalah gambar
            setPreview(URL.createObjectURL(file)); // Set URL untuk pratinjau
        } else {
            alert("Please select a valid image file.");
            setData("logo", null); // Reset jika file tidak valid
            setPreview(null); // Reset preview if file is invalid
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
                        {idUpdate ? "Update" : "Add"} Company
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
                                    name="name"
                                    id="name"
                                    className="mt-1 block w-full focus:border-black focus:ring-black border-gray-500 text-gray-600"
                                    placeholder="Name of Company"
                                    value={data.name}
                                    onChange={(e) =>
                                        handleChange("name", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={
                                        error.errors?.name && error.errors.name
                                    }
                                    className="mt-2"
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-2">
                                <InputLabel
                                    htmlFor="email"
                                    value="Email"
                                    className="text-black"
                                />
                                <TextInput
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="example@com"
                                    className="mt-1 block w-full focus:border-black focus:ring-black  border-gray-500 text-gray-600"
                                    value={data.email}
                                    onChange={(e) =>
                                        handleChange("email", e.target.value)
                                    }
                                    required
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
                                    htmlFor="website"
                                    value="Website"
                                    className="text-black"
                                />
                                <TextInput
                                    type="text"
                                    name="website"
                                    id="website"
                                    className="mt-1 block w-full focus:border-black focus:ring-black  border-gray-500 text-gray-600"
                                    placeholder="https://example.com"
                                    value={data.website}
                                    onChange={(e) =>
                                        handleChange("website", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={
                                        error.errors?.website &&
                                        error.errors.website
                                    }
                                    className="mt-2"
                                />
                            </div>
                            <div className="col-span-2">
                                <InputLabel
                                    htmlFor="dropzone-file"
                                    value="Upload Logo"
                                    className="text-black "
                                />

                                <div className="flex items-center flex-col justify-center w-full">
                                    <label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                                    >
                                        {preview ? (
                                            <div className="w-full h-full overflow-hidden">
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg
                                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 16"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                    />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">
                                                        Click to upload
                                                    </span>{" "}
                                                    or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    PNG or JPG (MAX. 500x500px)
                                                </p>
                                            </div>
                                        )}
                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept="image/jpeg, image/png"
                                        />
                                    </label>
                                    <InputError
                                        message={
                                            error.errors?.logo &&
                                            error.errors.logo
                                        }
                                        className="mt-2 self-start"
                                    />
                                </div>
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
