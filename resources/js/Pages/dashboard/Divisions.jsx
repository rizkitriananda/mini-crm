import React, { useState, useCallback } from "react";
import { Head } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import DashboardLayout from "@/Layouts/DashboardLayout";
import DivisionsForm from "./form/DivisionsForm";
import DivisionsTable from "./table/DivisionsTable";

export default function Divisions() {
    const [showModal, setShowModal] = useState(false);
    const [reloadData, setReloadData] = useState(false);

    const handleShowModal = useCallback(() => {
        setShowModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);

    const handleReloadData = useCallback(() => {
        console.log(reloadData);
        reloadData ? setReloadData(false) : setReloadData(true);
    }, [reloadData]);

    return (
        <DashboardLayout locationPage={"Divisions"}>
            <Modal
                show={showModal}
                bgColor="bg-white"
                width="w-screen"
                height="h-screen"
                children={
                    <DivisionsForm
                        onClose={handleCloseModal}
                        reloadData={handleReloadData}
                    />
                }
            />

            <main className="p-4">
                <DivisionsTable />
            </main>
        </DashboardLayout>
    );
}
