<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompaniesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
public function index(Request $request)
    {
    // Ambil parameter 'per_page' dari request, jika tidak ada, default ke 10
    $perPage = $request->input('per_page', 10);

    // Cek apakah ada parameter di request
    if ( $request->query()) {
        // Jika ada parameter, ambil data perusahaan dengan pagination
        $companies = Company::paginate($perPage);
    } else {
        // Jika tidak ada parameter, ambil semua perusahaan tanpa pagination
        $companies = Company::all();
    }

    return response()->json([
        "companies" => $companies
    ], 200);
}


    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    // Validasi input
    $validated = $request->validate([
        'name' => 'required|string|max:255|unique:companies',
        'email' => 'required|email|max:255|unique:companies|regex:/^[\w\.-]+@[\w\.-]+\.\w{2,}$/ ',
        'logo' => 'nullable|image|dimensions:max_width=500,max_height=500',
        'website' => 'nullable|url|max:255',
    ]);

    // Simpan logo jika ada file yang diunggah
    if ($request->hasFile('logo')) {
        $validated['logo'] = $request->file('logo')->store('logos','public');
    }

    $company = Company::create($validated);

    return response()->json($company, 201);
}


    /**
     * Display the specified resource.
     */

    
    public function show($id)
    {
     $company = Company::with('division')->findOrFail($id);
        return response()->json($company);
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Company $company)
    {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'nullable',
        'website' => 'nullable',
    ]);

    $company->update($validated);
    return response()->json(['message' => 'Company updated', 'company' => $company]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        // Hapus data perusahaan
        $company->delete();

        return response()->json([
            'status' => 'deleted',
            'message' => 'Company deleted', 
            'delete_company' => $company
        ]);

    }
}
