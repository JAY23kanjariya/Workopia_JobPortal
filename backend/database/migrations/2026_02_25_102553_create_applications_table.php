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
        Schema::create('applications', function (Blueprint $table) {
            $table->id();

            // foreign key
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('job_id')->constrained('job_listings')->cascadeOnDelete();

            // cover letter for personal explanation
            $table->text('cover_letter')->nullable();
            // resume file
            $table->string('resume')->nullable();

            // status of application
            $table->enum('status', ['pending', 'reviewed', 'shortlisted', 'rejected'])->default('pending');

            $table->timestamps();

            // unique constraint for user and job (Prevent duplicate apply)
            $table->unique(['user_id', 'job_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
