<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class DivisionsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name_division' => $this->faker->unique()->word() . ' Division', // Nama divisi unik
            'company_id' => Company::inRandomOrder()->value('id'), // Ambil ID perusahaan secara acak
        ];
    }
}
