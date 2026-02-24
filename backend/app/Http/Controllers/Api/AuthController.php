<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    // method to register a new user
    public function register(Request $request)
    {
        // validate the request
        $validated = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'email' => 'required|email|max:50|unique:users,email',
            'password' => [
                'required',
                'string',
                'min:8',
                'max:20',
                'confirmed',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%&_\-+?]).*$/'            ],
            'role' => 'required|in:admin,employer,jobseeker',
        ]);

        // if validation fails, return error response
        if ($validated->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation Failed',
                'errors' => $validated->errors(),
            ], 422);
        }

        // create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'jobseeker',
        ]);

        // create token for the register user
        $token = $user->createToken('workopia_token')->plainTextToken;

        // return success response
        return response()->json([
            'status' => 'success',
            'message' => 'User registered Successfully',
            'data' => [
                'user' => $user,
                'token' => $token,
            ]
        ], 201);
    }

    // method to login a user
    public function login(Request $request)
    {

        // check email and password is valid or Not
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid Credentials',
            ], 401);
        }

        // get User
        $user = Auth::user();

        // create token for the login user
        $token = $user->createToken('workopia_token')->plainTextToken;

        // return success response
        return response()->json([
            'status' => 'success',
            'message' => 'Login Successfully',
            'data' => [
                'user' => $user,
                'token' => $token,
            ]
        ], 200);
    }

    // method to logout a user
    public function logout(Request $request)
    {

        // revoke or delete the token
        $request->user()->currentAccessToken()->delete();

        // return success response
        return response()->json([
            'status' => 'success',
            'message' => 'Logout Successfully'
        ], 200);
    }
}
