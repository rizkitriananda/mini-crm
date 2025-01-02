import React, { useState, useCallback } from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";

export default function DashboardLayout({ children, locationPage }) {
    return (
        <section>
            <Head title={`${locationPage} - Dashboard`} />
            <Navbar locationPage={locationPage} />

            <main className="p-1 md:ml-[19rem]">{children}</main>
        </section>
    );
}
