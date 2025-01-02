<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Company::class;

    public function definition()
    {
        return [
            'name' => $this->faker->company, // Menghasilkan nama perusahaan acak
            'email' => $this->faker->unique()->safeEmail, // Menghasilkan email acak
            'logo' => null, // Anda bisa menambahkan logika untuk logo jika diperlukan
            'website' => $this->faker->url, // Menghasilkan URL acak
        ];
    }
}
