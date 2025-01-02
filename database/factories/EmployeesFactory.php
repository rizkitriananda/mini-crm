<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\Divisions;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employees>
 */
class EmployeesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'company_id' => Company::inRandomOrder()->value('id'), // Ambil ID perusahaan secara acak
            'divisions_id' => Divisions::inRandomOrder()->value('id'), // Ambil ID perusahaan secara acak
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
        ];
    }
}
