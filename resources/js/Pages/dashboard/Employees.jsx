import React, { useState, useCallback } from "react";
import { Head } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import EmployeesTable from "./table/EmployeesTable";

export default function Employees() {
    return (
        <DashboardLayout locationPage={"Employees"}>
            <main className="p-4">
                <EmployeesTable />
            </main>
        </DashboardLayout>
    );
}
