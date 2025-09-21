<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Technology;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TechnologyController extends Controller
{
    public function index(): JsonResponse
    {
        $technologies = Technology::orderBy('category')->orderBy('name')->get();
        return response()->json($technologies);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:50|unique:technologies',
            'category' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:7',
            'icon' => 'nullable|string|max:100',
        ]);

        $technology = Technology::create($request->all());
        return response()->json($technology, 201);
    }

    public function show(Technology $technology): JsonResponse
    {
        return response()->json($technology->load('projects'));
    }

    public function update(Request $request, Technology $technology): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:50|unique:technologies,name,' . $technology->id,
            'category' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:7',
            'icon' => 'nullable|string|max:100',
        ]);

        $technology->update($request->all());
        return response()->json($technology);
    }

    public function destroy(Technology $technology): JsonResponse
    {
        $technology->delete();
        return response()->json(['message' => 'Technology deleted successfully']);
    }
}
