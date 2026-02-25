<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
// uses
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;
use App\Models\Category;
use App\Models\Application;

class Job extends Model
{
    use HasFactory;

    protected $table = 'job_listings';

    protected $fillable = [
        'title',
        'user_id',
        'category_id',
        'location',
        'job_type',
        'experience',
        'salary_min',
        'salary_max',
        'description',
        'status',
    ];

    // relations(foreign key) Employer (User)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // relations(foreign key) Category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // relations(one to many) Job has many applications
    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}
