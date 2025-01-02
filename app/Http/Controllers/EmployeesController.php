<?php

namespace App\Http\Controllers;

use App\Models\Employees;
use Illuminate\Http\Request;

class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
    $perPage = $request->input('per_page', 10);

    if($request->query()){
        // Ambil data perusahaan dengan pagination
        $employees = Employees::with(['company','division'])->paginate($perPage);
    } else{
        $employees = Employees::with('division','company')->get();
    }

    return response()->json([
        "employees" => $employees
            ], 200
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    $validated = $request->validate([
    'first_name' => 'string|max:255',
    'last_name' => 'string|max:255',
    'company_id' => 'required|exists:companies,id',
    'divisions_id' => 'required|exists:divisions,id',
    'email' => 'required|email|max:255|unique:employees,email',
    'phone' => 'required|string|max:15',
    ]);

    $employees = Employees::create($validated);
    return response()->json($employees, 200);

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $employee = Employees::with('company')->findOrFail($id);
        return response()->json($employee);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employees $employee)
    {
        $validated = $request->validate([
            'first_name' => 'string|max:255',
            'last_name' => 'string|max:255',
            'company_id' => 'required|exists:companies,id',
            'divisions_id' => 'required|exists:divisions,id',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:15',
    ]);

    $employee->update($validated);
    return response()->json(['message' => 'Employee updated', 'employee' => $employee]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employees $employee)
    {
      $employee->delete();

        return response()->json([
            'status' => 'deleted',
            'message' => 'Company deleted', 
            'delete_employee' => $employee
        ]);
    }
}
