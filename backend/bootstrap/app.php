<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

// uses
use App\Http\Middleware\RoleMiddleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        // add or load web routes
        web: __DIR__.'/../routes/web.php',
        // add or load api routes
        api: __DIR__.'/../routes/api.php',
        // add or load console routes
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // add role middleware
        $middleware->alias([
            RoleMiddleware::class, 'role'
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
