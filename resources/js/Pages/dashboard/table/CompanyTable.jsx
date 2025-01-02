import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Modal from "@/Components/Modal";
import ConfirmModal from "@/Components/ConfirmModal";
import TableLayout from "@/Layouts/TableLayout";
import BlueButton from "@/Components/BlueButton";
import Loading from "@/Components/Loading";
import Alert from "@/Components/Alert";
import CompanyForm from "../form/CompanyForm";
import { FiPlus } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";

export default function CompanyTable() {
    const [companies, setCompanies] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [idUpdateData, setIdUpdateData] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalCompanies, setTotalCompanies] = useState(0); // Total items
    const [totalPages, setTotalPages] = useState(0); // Total pages
    const theadTable = ["Logo", "Name", "Email", "Website"];

    const fetchCompanies = async (page) => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `/api/companies?page=${page}&per_page=${perPage}`
            );
            console.log("data fetching.....");
            setCompanies(data.companies.data);
            setTotalCompanies(data.companies.total);
            setTotalPages(data.companies.last_page); // Total pages
            setPerPage(data.companies.per_page); // Items per page
        } catch (error) {
            console.error("Failed to fetch companies:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedId) return;

        try {
            await axios.delete(`/api/companies/${selectedId}`);
            await fetchCompanies(currentPage); // Fetch companies after deletion
            setShowDeleteModal(false);
            // setAlert(true);
            notify("Company successfully deleted");
        } catch (error) {
            console.error("Failed to delete company:", error);
        }
    };

    const getUrlCompany = (webUrl) => {
        const url = webUrl;
        const getUrl = url.split("//").pop();
        return getUrl;
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setIdUpdateData(null);
    };

    const handleEdit = (id) => {
        setIdUpdateData(id);
        setShowModal(true);
    };

    const handleReload = useCallback(() => {
        fetchCompanies(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleToast = useCallback((message) => {
        notify(message);
    });

    const notify = (message) =>
        toast.success(`${message}`, {
            position: "top-right",
            theme: "colored",
        });

    useEffect(() => {
        fetchCompanies(currentPage);
        console.log(companies);
    }, [currentPage]);

    return (
        <TableLayout
            tableName={"Companies"}
            button={
                <BlueButton type="button" onClick={() => handleShowModal()}>
                    <FiPlus size={22} className="hidden md:flex" />
                    <span>Add New</span>
                </BlueButton>
            }
            // alert={<Alert action={alert} message={<span>success</span>} />}
        >
            <div className="relative overflow-x-auto w-full rounded-lg bg-white shadow-md z-0 border ">
                <div className="h-16"></div>

                <table className="w-full relative text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase border-b-[1px] border-gray-200 bg-white dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                No.
                            </th>

                            {theadTable.map((header, index) => (
                                <th
                                    scope="col"
                                    className="px-6 py-4"
                                    key={index}
                                >
                                    {header}
                                </th>
                            ))}

                            <th scope="col" className="px-6 py-4">
                                Action
                            </th>
                        </tr>
                    </thead>

                    {/* Data table */}

                    {loading ? (
                        <div className="h-32">
                            <Loading />
                        </div>
                    ) : (
                        <tbody>
                            {companies.map((company, index) => (
                                <tr
                                    key={company.id}
                                    className="bg-white border-b dark:border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-100"
                                >
                                    <td className="px-6 py-4">
                                        {index +
                                            1 +
                                            (currentPage - 1) * perPage}
                                    </td>
                                    <td className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {company.logo ? (
                                            <img
                                                src={`/storage/${company.logo}`}
                                                alt="Company Logo"
                                                className="logo-image w-12 h-12 rounded-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-gray-300">
                                                N/A
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {company.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {company.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <a
                                            href={company.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline"
                                        >
                                            {getUrlCompany(company.website)}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2 items-center">
                                            <button
                                                className="font-medium text-blue-600 hover:underline"
                                                onClick={() => {
                                                    handleEdit(company.id);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="font-medium text-red-600 hover:underline"
                                                onClick={() => {
                                                    setSelectedId(company.id);
                                                    setShowDeleteModal(true);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            <Modal
                                bgColor=""
                                width="w-64"
                                height="h-screen"
                                show={showDeleteModal}
                            >
                                <ConfirmModal
                                    show={showDeleteModal}
                                    onClose={() => setShowDeleteModal(false)}
                                    onConfirm={handleDelete}
                                />
                            </Modal>

                            <Modal
                                show={showModal}
                                bgColor="bg-white"
                                width="w-screen"
                                height="h-screen"
                                children={
                                    <CompanyForm
                                        idUpdate={idUpdateData}
                                        onClose={() => handleCloseModal()}
                                        reload={handleReload}
                                        alert={handleToast}
                                    />
                                }
                            />
                        </tbody>
                    )}
                </table>

                <nav
                    className={`flex items-center justify-between p-4 bg-gradient-to-r from-[#2A2A2A] to-[#474747]`}
                    aria-label="Table navigation"
                >
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        Showing
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {" " +
                                (companies.length > 0
                                    ? (currentPage - 1) * perPage + 1
                                    : 0) +
                                " to " +
                                (currentPage * perPage > totalCompanies
                                    ? totalCompanies
                                    : currentPage * perPage) +
                                " "}
                        </span>
                        of
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {" " + totalCompanies + " "}
                        </span>
                    </span>

                    <ul className="inline-flex -space-x-px text-sm h-8">
                        <li>
                            <button
                                onClick={() =>
                                    setCurrentPage(
                                        currentPage > 1 ? currentPage - 1 : 1
                                    )
                                }
                                disabled={currentPage === 1}
                                className="flex items-center disabled:hover:bg-gray-800 disabled:hover:text-gray-400 justify-center cursor-pointer px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
                            >
                                Previous
                            </button>
                        </li>

                        {/* Menampilkan tombol untuk setiap halaman */}
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index + 1}>
                                <button
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`flex items-center justify-center px-3 h-8 leading-tight ${
                                        currentPage === index + 1
                                            ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                            : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}

                        <li>
                            <button
                                onClick={() =>
                                    setCurrentPage(
                                        currentPage < totalPages
                                            ? currentPage + 1
                                            : totalPages
                                    )
                                }
                                disabled={currentPage === totalPages}
                                className="flex items-center justify-center cursor-pointer px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <ToastContainer position="top-right" theme="colored" />
        </TableLayout>
    );
}
