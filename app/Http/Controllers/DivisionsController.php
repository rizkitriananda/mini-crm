<?php

namespace App\Http\Controllers;

use App\Models\Divisions;
use Illuminate\Http\Request;

class DivisionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
public function index(Request $request)
{
    $perPage = $request->input('per_page', 10);
    
    // Ambil data divisi dengan relasi ke perusahaan dan karyawan
    $divisions = Divisions::with(['company', 'employees'])->paginate($perPage);

    // Format data divisi
    $formattedDivisions = $divisions->getCollection()->map(function ($division) {
        return [
            'id' => $division->id,
            'name_division' => $division->name_division,
            'company' => $division->company ? $division->company->only(['id', 'name', 'email', 'website']) : null,
            'members' => $division->employees->map(function ($employee) {
                return $employee->only(['id', 'first_name', 'last_name', 'email', 'phone']);
            }),
        ];
    });

    // Jika ada query parameter, kembalikan data terformat
    if ($request->query()) {
        return response()->json([
            'divisions' => [
                'data' => $formattedDivisions,
                'current_page' => $divisions->currentPage(),
                'last_page' => $divisions->lastPage(),
                'per_page' => $divisions->perPage(),
                'total' => $divisions->total(),
            ]
        ]);
    } else {
        // Jika tidak ada query parameter, ambil semua divisi dengan relasi
        $allDivisions = Divisions::with(['company', 'employees'])->get()->map(function ($division) {
            return [
                'id' => $division->id,
                'name_division' => $division->name_division,
                'company' => $division->company ? $division->company->only(['id', 'name', 'email', 'website']) : null,
                'members' => $division->employees->map(function ($employee) {
                    return $employee->only(['id', 'first_name', 'last_name', 'email', 'phone']);
                }),
            ];
        });

        return response()->json(['divisions' => $allDivisions]);
    }
}
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    $validated = $request->validate([
    'name_division' => 'string|max:255',
    'company_id' => 'required|exists:companies,id',
    ]);

    $division = Divisions::create($validated);
    return response()->json($division, 200);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
      $division = Divisions::with('company')->findOrFail($id);
        return response()->json($division);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Divisions $division)
    {
     $validated = $request->validate([
        'name_division' => 'required|string|max:255',
        'company_id' => 'required|exists:companies,id',
    ]);

    $division->update($validated);
    return response()->json(['message' => 'Division updated', 'division' => $division]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Divisions $division)
    {
       // Hapus data perusahaan
        $division->delete();

        return response()->json([
            'status' => 'deleted',
            'message' => 'Division deleted', 
            'delete_company' => $division
        ]);
    }
}
