<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// uses
use App\Models\Job;
use Illuminate\Support\Facades\Validator;

class JobController extends Controller
{
    // get all jobs
    public function index(Request $request)
    {
        // get all jobs with user and category
        $jobs = Job::with(['user', 'category'])->where('status', true);

        // search by title
        if ($request->search) {
            $jobs->where('title', 'like', '%' . $request->search . '%');
        }

        // filter by category
        if ($request->category_id) {
            $jobs->where('category_id', $request->category_id);
        }

        // filter by location
        if ($request->location) {
            $jobs->where('location', $request->location);
        }

        // filter by job type
        if ($request->job_type) {
            $jobs->where('job_type', $request->job_type);
        }

        // jobs with pagination
        $filterJobs = $jobs->latest()->paginate(5);

        // return response
        return response()->json([
            'status' => true,
            'message' => 'Jobs retrieved successfully',
            'data' => $filterJobs,
        ]);
    }

    // get single job
    public function show($id)
    {
        $job = Job::with(['user', 'category'])->find($id);

        if (!$job) {
            return response()->json([
                'status' => false,
                'message' => 'Job not found',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Job fetched successfully',
            'data' => $job,
        ], 200);
    }

    // create job (only Employer)
    public function create(Request $request)
    {
        // validation Request : check input data come from frontend 
        $validated = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:100', 'unique:job_listings,title'],
            'category_id' => ['required', 'exists:categories,id'],
            'location' => ['required', 'string', 'max:100'],
            'job_type' => ['required', 'string', 'max:50'],
            'experience' => ['required', 'string', 'max:50'],
            'salary_min' => ['required', 'integer', 'min:0'],
            'salary_max' => ['required', 'integer', 'min:0'],
            'description' => ['required', 'string'],
            'status' => ['required', 'boolean'],
        ]);

        // return response if validation fails
        if ($validated->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validated->errors(),
            ], 400);
        }

        // create job
        $job = Job::create([
            'title' => $request->title,
            'user_id' => auth()->id(),
            'category_id' => $request->category_id,
            'location' => $request->location,
            'job_type' => $request->job_type,
            'experience' => $request->experience,
            'salary_min' => $request->salary_min,
            'salary_max' => $request->salary_max,
            'description' => $request->description,
            'status' => $request->status,
        ]);

        // return response
        return response()->json([
            'status' => true,
            'message' => 'Job created successfully',
            'data' => $job,
        ], 201);
    }

    // update job (only Employer who created)
    public function update(Request $request, $id)
    {
        // find job by id
        $job = Job::find($id);

        // return response if job not found
        if (!$job) {
            return response()->json([
                'status' => false,
                'message' => 'Job not found',
            ], 404);
        }

        // check if the job is created by the authenticated user
        if ($job->user_id != auth()->id()) {
            return response()->json([
                'status' => false,
                'message' => 'You are not authorized to update this job',
            ], 403);
        }

        // validation Request : check input data come from frontend 
        $validated = Validator::make($request->all(), [
            'title' => ['sometimes', 'required', 'string', 'max:100', 'unique:job_listings,title,' . $id],
            'category_id' => ['sometimes', 'required', 'exists:categories,id'],
            'location' => ['sometimes', 'required', 'string', 'max:100'],
            'job_type' => ['sometimes', 'required', 'string', 'max:50'],
            'experience' => ['sometimes', 'required', 'string', 'max:50'],
            'salary_min' => ['sometimes', 'required', 'integer', 'min:0'],
            'salary_max' => ['sometimes', 'required', 'integer', 'min:0'],
            'description' => ['sometimes', 'required', 'string'],
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

        // update job
        $job->update($request->only(['title', 'category_id', 'location', 'job_type', 'experience', 'salary_min', 'salary_max', 'description', 'status']));

        // return response
        return response()->json([
            'status' => true,
            'message' => 'Job updated successfully',
            'data' => $job,
        ], 200);
    }

    // delete job (only Employer who created)
    public function destroy($id)
    {
        // find job by id
        $job = Job::find($id);

        // return response if job not found
        if (!$job) {
            return response()->json([
                'status' => false,
                'message' => 'Job not found',
            ], 404);
        }

        // check if the job is created by the authenticated user
        if ($job->user_id != auth()->id()) {
            return response()->json([
                'status' => false,
                'message' => 'You are not authorized to delete this job',
            ], 403);
        }

        // delete job
        $job->delete();

        // return response
        return response()->json([
            'status' => true,
            'message' => 'Job deleted successfully',
        ], 200);
    }
}
