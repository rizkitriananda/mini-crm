<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employees extends Model
{
    use HasFactory;

    protected $fillable = ['first_name', 'last_name', 'company_id', 'divisions_id', 'email', 'phone'];

    // Relasi ke Company (Many-to-One)
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function division()
    {
        return $this->belongsTo(Divisions::class, 'divisions_id');
    }
}
