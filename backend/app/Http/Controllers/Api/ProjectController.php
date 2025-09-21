<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Project::with(['technologies', 'features', 'gallery'])
                       ->orderBy('featured', 'desc')
                       ->orderBy('created_at', 'desc');

        if ($request->has('category')) {
            $query->where('category', 'like', '%' . $request->category . '%');
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('featured')) {
            $query->where('featured', $request->boolean('featured'));
        }

        $projects = $query->paginate(12);

        return response()->json($projects);
    }

    public function show(Project $project): JsonResponse
    {
        return response()->json($project->load(['technologies', 'features', 'gallery']));
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:200',
            'slug' => 'required|string|max:200|unique:projects',
            'category' => 'required|string|max:100',
            'description' => 'required|string',
            'long_description' => 'nullable|string',
            'image' => 'nullable|string|max:500',
            'live_url' => 'nullable|url|max:500',
            'github_url' => 'nullable|url|max:500',
            'status' => 'required|in:Terminé,En cours,En pause',
            'date_completed' => 'nullable|integer|digits:4',
            'client' => 'nullable|string|max:100',
            'duration' => 'nullable|string|max:50',
            'featured' => 'boolean',
            'technologies' => 'array',
            'technologies.*' => 'exists:technologies,id',
        ]);

        $project = Project::create($request->except('technologies'));

        if ($request->has('technologies')) {
            $project->technologies()->sync($request->technologies);
        }

        return response()->json($project->load(['technologies', 'features', 'gallery']), 201);
    }

    public function update(Request $request, Project $project): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:200',
            'slug' => 'required|string|max:200|unique:projects,slug,' . $project->id,
            'category' => 'required|string|max:100',
            'description' => 'required|string',
            'long_description' => 'nullable|string',
            'image' => 'nullable|string|max:500',
            'live_url' => 'nullable|url|max:500',
            'github_url' => 'nullable|url|max:500',
            'status' => 'required|in:Terminé,En cours,En pause',
            'date_completed' => 'nullable|integer|digits:4',
            'client' => 'nullable|string|max:100',
            'duration' => 'nullable|string|max:50',
            'featured' => 'boolean',
            'technologies' => 'array',
            'technologies.*' => 'exists:technologies,id',
        ]);

        $project->update($request->except('technologies'));

        if ($request->has('technologies')) {
            $project->technologies()->sync($request->technologies);
        }

        return response()->json($project->load(['technologies', 'features', 'gallery']));
    }

    public function destroy(Project $project): JsonResponse
    {
        $project->delete();

        return response()->json(['message' => 'Project deleted successfully']);
    }
}
