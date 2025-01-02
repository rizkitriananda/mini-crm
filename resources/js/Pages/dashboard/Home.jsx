import { useState, useEffect } from "react";
import Card from "@/Components/Card";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { FaUser, FaBuilding } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoGrid } from "react-icons/io5";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function Companies() {
    const [dataCounts, setDataCounts] = useState({
        users: 0,
        companies: 0,
        employees: 0,
        divisions: 0,
    });

    const fetchData = async () => {
        try {
            const [
                usersResponse,
                companiesResponse,
                employeesResponse,
                divisionsResponse,
            ] = await Promise.all([
                axios.get("/api/users"),
                axios.get("/api/companies"),
                axios.get("/api/employees"),
                axios.get("/api/divisions"),
            ]);

            setDataCounts({
                users: usersResponse.data.users.length,
                companies: companiesResponse.data.companies.length,
                employees: employeesResponse.data.employees.length,
                divisions: divisionsResponse.data.divisions.length,
            });
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const notify = () => toast.success("succes");

    return (
        <DashboardLayout locationPage={"Home"}>
            <div className="cards flex-col gap-y-6">
                <header>
                    <div className="cards flex-col gap-y-6">
                        <div
                            id="card"
                            className="w-full p-7 bg-gradient-to-r from-[#2A2A2A] to-[#474747] rounded-lg shadow flex items-center"
                        >
                            <div className="name-table font-bold text-white md:text-lg">
                                Data Today
                            </div>
                        </div>
                    </div>
                </header>
                <div className="card-child flex flex-wrap gap-3 md:gap-x-6 md:gap-0 w-full mt-5">
                    <div className="flex-1">
                        <Card
                            link={"/dashboard/users"}
                            icon={<FaUser className="text-white" size={25} />}
                            tableName={"Users"}
                            dataCount={dataCounts.users}
                        />
                    </div>
                    <div className="flex-1">
                        <Card
                            link={"/dashboard/companies"}
                            icon={
                                <FaBuilding className="text-white" size={25} />
                            }
                            tableName={"Companies"}
                            dataCount={dataCounts.companies}
                        />
                    </div>
                    <div className="flex-1">
                        <Card
                            link={"/dashboard/employees"}
                            icon={
                                <FaUserGroup className="text-white" size={25} />
                            }
                            tableName={"Employees"}
                            dataCount={dataCounts.employees}
                        />
                    </div>
                    <div className="flex-1">
                        <Card
                            link={"/dashboard/divisions"}
                            icon={<IoGrid className="text-white" size={25} />}
                            tableName={"Divisions"}
                            dataCount={dataCounts.divisions}
                        />
                    </div>
                </div>
            </div>

            <ToastContainer theme="colored" />
        </DashboardLayout>
    );
}
