<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

// uses
use App\Models\Category;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\Events\Validated;

class CategoryController extends Controller
{
    // Get All categories (Public available)
    public function index()
    {
        // fetch all categories in latest order
        $categories = Category::latest()->get();

        // return response 
        return response()->json([
            'status' => true,
            'message' => 'Categories fetched successfully',
            'data' => $categories,
        ], 200);
    }

    // Get Single Category (Public available)
    public function show($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Category not found',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Category fetched successfully',
            'data' => $category,
        ], 200);
    }

    // Store Category (Admin only)
    public function store(Request $request)
    {

        //validation Request : check input data come from frontend 
        $validated = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:50', 'unique:categories,name'],
            'status' => ['required'],
        ]);

        // return response if validation fails
        if ($validated->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validated->errors()
            ], 400);
        }

        // create Category
        $category = Category::create([
            'name' => $request->name,
            'status' => $request->status,
        ]);

        // return response
        return response()->json([
            'status' => true,
            'message' => 'Category created successfully',
            'data' => $category,
        ], 201);
    }

    // Update Category (Admin only)
    public function update(Request $request, $id)
    {
        // find category by id
        $category = Category::find($id);

        // return response if category not found
        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Category not found',
            ], 404);
        }
        // validation Request : check input data come from frontend 
        $validated = Validator::make($request->all(), [
            'name' => ['sometimes', 'required', 'string', 'max:50', 'unique:categories,name,' . $id],
            'status' => ['sometimes', 'required', 'boolean'],
        ]);

        // return response if validation fails
        if ($validated->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validated->errors(),
            ], 400);
        }

        // update category
        $category->update($request->only(['name', 'status']));

        // return response
        return response()->json([
            'status' => true,
            'message' => 'Category updated successfully',
            'data' => $category,
        ], 200);
    }

    // Delete Category (Admin only)
    public function destroy($id)
    {
        // find category by id
        $category = Category::find($id);

        // return response if category not found
        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Category not found',
            ], 404);
        }

        // delete category
        $category->delete();

        // return response
        return response()->json([
            'status' => true,
            'message' => 'Category deleted successfully',
        ], 200);
    }
}
