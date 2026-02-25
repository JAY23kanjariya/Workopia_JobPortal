<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
// uses
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;
use App\Models\Job;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'job_id',
        'cover_letter',
        'resume',
        'status',
    ];

    // relations(foreign key) Job Seeker (User)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // relations(foreign key) Job
    public function job()
    {
        return $this->belongsTo(Job::class);
    }
}
