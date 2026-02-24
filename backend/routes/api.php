<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

// add or load api routes
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
});