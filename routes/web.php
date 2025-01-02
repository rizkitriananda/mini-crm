<?php

use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;






Route::get('/', function(){
    return Inertia::render('Login');
});

Route::get('/register', function(){
    return Inertia::render('Register');
});


// Dashboard
Route::get('/dashboard/home', function(){
    return Inertia::render('dashboard/Home');
});
Route::get('/dashboard/users', function(){
    return Inertia::render('dashboard/Users');
});
Route::get('/dashboard/companies', function(){
    return Inertia::render('dashboard/Companies');
});
Route::get('/dashboard/employees', function(){
    return Inertia::render('dashboard/Employees');
});
Route::get('/dashboard/divisions', function(){
    return Inertia::render('dashboard/Divisions');
});



Route::controller(PasswordResetController::class)->group(function () {
    Route::get('/forgot-password', 'create')->name('password.request');
    Route::post('/forgot-password', 'store')->name('password.email');
    Route::get('/reset-password/{token}', 'edit')->name('password.reset');
    Route::post('/reset-password', 'update')->name('password.update');
});


// Rute halaman dashboard (memerlukan login)
/*Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard/home', function () {
        return Inertia::render('dashboard/Home');
    })->name('dashboard.home');

    Route::get('/dashboard/users', function () {
        return Inertia::render('dashboard/Users');
    })->name('dashboard.users');

    Route::get('/dashboard/companies', function () {
        return Inertia::render('dashboard/Companies');
    })->name('dashboard.companies');

    Route::get('/dashboard/employees', function () {
        return Inertia::render('dashboard/Employees');
    })->name('dashboard.employees');

    Route::get('/dashboard/divisions', function () {
        return Inertia::render('dashboard/Divisions');
    })->name('dashboard.divisions');
});*/





/*Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');*/

/*Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});*/

require __DIR__.'/auth.php';
