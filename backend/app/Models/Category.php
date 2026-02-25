<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    // fillable properties for Category table
    protected $fillable = [
        'name',
        'status',
    ];
}
