<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('first_name')->nullable(false); // Nama depan
            $table->string('last_name')->nullable(false); // Nama belakang
            $table->foreignId('company_id')->nullable()->constrained('companies')->onDelete('set null'); // Tetapkan null jika perusahaan dihapus
            $table->foreignId('divisions_id')->nullable()->constrained('divisions')->onDelete('set null'); // Tetapkan null jika perusahaan dihapus
            $table->string('email')->nullable(); // Email karyawan
            $table->string('phone')->nullable(); // No telepon
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
