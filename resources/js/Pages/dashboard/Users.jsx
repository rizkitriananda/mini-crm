import React, { useState, useCallback } from "react";
import Modal from "@/Components/Modal";
import DashboardLayout from "@/Layouts/DashboardLayout";
import UserForm from "./form/UserForm";
import UsersTable from "./table/UsersTable";

export default function Users() {
    const [showModal, setShowModal] = useState(false);
    const [reloadData, setReloadData] = useState(false);

    const handleShowModal = useCallback(() => {
        setShowModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);

    return (
        <DashboardLayout locationPage={"Users"}>
            {/* <Modal
                show={showModal}
                bgColor="bg-white"
                width="w-screen"
                height="h-screen"
                children={
                    <UserForm
                        onClose={handleCloseModal}
                        reloadData={handleReloadData}
                    />
                }
            /> */}

            <main className="p-4">
                <UsersTable />
            </main>
        </DashboardLayout>
    );
}
