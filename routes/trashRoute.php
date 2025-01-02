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