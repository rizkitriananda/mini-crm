import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Modal from "@/Components/Modal";
import ConfirmModal from "@/Components/ConfirmModal";
import TableLayout from "@/Layouts/TableLayout";
import BlueButton from "@/Components/BlueButton";
import { FiPlus } from "react-icons/fi";
import DivisionsForm from "../form/DivisionsForm";
import Loading from "@/Components/Loading";
import { toast, ToastContainer } from "react-toastify";

export default function DivisionsTable() {
    const [divisions, setDivisions] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [idUpdateData, setIdUpdateData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalDivision, setTotalDivision] = useState(0); // Total items
    const [totalPages, setTotalPages] = useState(0); // Total pages
    const theadTable = ["Division", "Company", "Member"];

    const fetch = async (page) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/divisions?page=${page}`);
            console.log("data fetching.....");
            setDivisions(data.divisions.data);
            console.log(data.divisions);
            setTotalDivision(data.divisions.total);
            setTotalPages(data.divisions.last_page); // Total pages
            setPerPage(data.divisions.per_page); // Items per page
        } catch (error) {
            console.error("Failed to fetch employees:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedId) return;

        try {
            await axios.delete(`/api/divisions/${selectedId}`);
            setShowDeleteModal(false);
            notify("Division successfully deleted");
            fetch();
        } catch (error) {
            console.error("Failed to delete company:", error);
        }
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setIdUpdateData(null);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleReload = useCallback(() => {
        fetch();
    });

    const handleToast = useCallback((message) => {
        notify(message);
    });

    const notify = (message) => toast.success(message, { theme: "colored" });

    useEffect(() => {
        fetch(currentPage);
    }, [currentPage]);

    return (
        <TableLayout
            tableName={"Divisions"}
            button={
                <BlueButton type="button" onClick={() => handleShowModal()}>
                    <FiPlus size={22} className="hidden md:flex" />
                    <span>Add New</span>
                </BlueButton>
            }
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
                            {divisions.map((division, index) => (
                                <tr
                                    key={division.id}
                                    className="bg-white border-b dark:border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-100"
                                >
                                    <td className="px-6 py-4">
                                        {" "}
                                        {index +
                                            1 +
                                            (currentPage - 1) * perPage}
                                    </td>
                                    <td className="px-6 py-2 ">
                                        {division.name_division}
                                    </td>
                                    <td className="px-6 py-4">
                                        {division.company
                                            ? division.company.name
                                            : "N/A"}
                                    </td>

                                    <td className="px-6 py-4 list-disc list-inside">
                                        <ul>
                                            {division.members.length > 0 ? (
                                                division.members.map(
                                                    (member) => (
                                                        <li key={member.id}>
                                                            -{" "}
                                                            {member.first_name +
                                                                " " +
                                                                member.last_name}
                                                        </li>
                                                    )
                                                )
                                            ) : (
                                                <li>N/A</li>
                                            )}
                                        </ul>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex gap-2 items-center">
                                            <button
                                                className="font-medium text-blue-600 hover:underline"
                                                onClick={() => {
                                                    setIdUpdateData(
                                                        division.id
                                                    );
                                                    handleShowModal();
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="font-medium text-red-600 hover:underline"
                                                onClick={() => {
                                                    setSelectedId(division.id);
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
                                    <DivisionsForm
                                        onClose={() => handleCloseModal()}
                                        idUpdate={idUpdateData}
                                        reload={handleReload}
                                        toast={handleToast}
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
                                (divisions.length > 0
                                    ? (currentPage - 1) * perPage + 1
                                    : 0) +
                                " to " +
                                (currentPage * perPage > totalDivision
                                    ? totalDivision
                                    : currentPage * perPage) +
                                " "}
                        </span>
                        of
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {" " + totalDivision + " "}
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
            <ToastContainer theme="colored" />
        </TableLayout>
    );
}
