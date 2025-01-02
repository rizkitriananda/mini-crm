<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Company;
use App\Models\Divisions;
use App\Models\Employees;
use Illuminate\Support\Facades\Hash;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->count(15)->create();
        Company::factory()->count(15)->create();
        Divisions::factory()->count(15)->create();
        Employees::factory()->count(15)->create();

        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
            'role' => 'admin', 
        ]);
        User::create([
            'name' => 'Rizki',
            'email' => 'riskitriananda321@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'User', 
        ]);

        User::create([
            'name' => 'Superadmin',
            'email' => 'superadmin@admin.com',
            'password' => Hash::make('password'),
            'role' => 'superadmin',
        ]);

        Company::create([
            'name' => 'Bitkreasi',
            'email' => 'bitkreasi@gmail.com',
            'website' => 'bitkreasi.com'
        ]);
        Company::create([
            'name' => 'Nemolab',
            'email' => 'bitkreasi@gmail.com',
            'website' => 'bitkreasi.com'
        ]);

       Employees::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'company_id' => 1,
            'email' => 'john.doe@example.com',
            'phone' => '123456789',
        ]);

       Employees::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'company_id' => 2,
            'email' => 'john2doe@example.com',
            'phone' => '123456789',
        ]);

        Divisions::create([
            'name_division' => 'Front-end',
            'company_id' => 1
        ]);
        Divisions::create([
            'name_division' => 'Back-end',
            'company_id' => 2
        ]);

    }
}
