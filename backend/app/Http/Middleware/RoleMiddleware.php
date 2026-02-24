<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // send response if user is not authenticated(not logged in)
        if (!$request->user()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 401);
        }

        // send response if user is not authorized for the action(access denied)
        if (!in_array($request->user()->role, $roles)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Forbidden - Access Denied'
            ], 403);
        }

        // if user is authenticated and authorized, allow the request to proceed
        return $next($request);
    }
}
