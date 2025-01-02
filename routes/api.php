<?php

use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\CompaniesController;
use App\Http\Controllers\CountController;
use App\Http\Controllers\CountDataController;
use App\Http\Controllers\DivisionsController;
use App\Http\Controllers\EmployeesController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');*/

Route::apiResource('companies', CompaniesController::class);
Route::apiResource('employees', EmployeesController::class);
Route::apiResource('users', UsersController::class);
Route::apiResource('divisions', DivisionsController::class);

Route::post('login', [AuthenticationController::class, 'authenticate']);
Route::post('logout', [AuthenticationController::class, 'logout']);

