<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $table = 'companies';
    use HasFactory;
        protected $fillable = [
        'name',
        'email',
        'logo',
        'website',
    ];

        // yang dijaga
    protected $guarded = ['id'];

      public function division()
    {
        return $this->hasMany(Divisions::class);
    }

    public function employees()
    {
        return $this->hasMany(Employees::class);
    }
}
