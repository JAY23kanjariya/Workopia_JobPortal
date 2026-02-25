<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

// public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // admin routes
    Route::middleware('role:admin')->group(function () {
        
    });

    // employer routes
    Route::middleware('role:employer')->group(function () {
        
    });

    // job seeker routes
    Route::middleware('role:job_seeker')->group(function () {
        
    });
});