<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Employee;
use App\Models\Employees;
use App\Models\User;
use Illuminate\Http\Request;

class CountController extends Controller
{
    /**
     * Get the total count of companies.
     */
    public function companiesCount()
    {
        $count = Company::count();
        return response()->json(['count' => $count]);
    }

    /**
     * Get the total count of employees.
     */
    public function employeesCount()
    {
        $count = Employees::count();
        return response()->json(['count' => $count]);
    }

    /**
     * Get the total count of users.
     */
    public function usersCount()
    {
        $count = User::count();
        return response()->json(['count' => $count]);
    }

        public function getAllCompanies()
{
    // Ambil semua perusahaan
    $companies = Company::all();

    return response()->json([
        "companies" => $companies
    ], 200);
}
}
