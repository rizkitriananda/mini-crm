import React, { useState, useCallback } from "react";
import { Head } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import CompanyTable from "./table/CompanyTable";

export default function Company() {
    return (
        <DashboardLayout locationPage={"Companies"}>
            <main className="p-4">
                <CompanyTable />
            </main>
        </DashboardLayout>
    );
}
