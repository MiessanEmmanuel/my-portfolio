<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FormationCategory;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FormationCategoryController extends Controller
{
    public function index(): JsonResponse
    {
        $categories = FormationCategory::withCount('formations')
            ->orderBy('name')
            ->get();

        return response()->json($categories);
    }

    public function show(FormationCategory $category): JsonResponse
    {
        $category->load([
            'formations' => function($query) {
                $query->published()
                    ->with(['instructor.user'])
                    ->orderBy('created_at', 'desc');
            }
        ]);

        return response()->json($category);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:formation_categories',
            'slug' => 'required|string|max:255|unique:formation_categories',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:7',
            'sort_order' => 'integer|min:0',
        ]);

        $category = FormationCategory::create($request->all());

        return response()->json($category, 201);
    }

    public function update(Request $request, FormationCategory $category): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:formation_categories,name,' . $category->id,
            'slug' => 'required|string|max:255|unique:formation_categories,slug,' . $category->id,
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:7',
            'sort_order' => 'integer|min:0',
        ]);

        $category->update($request->all());

        return response()->json($category);
    }

    public function destroy(FormationCategory $category): JsonResponse
    {
        if ($category->formations()->count() > 0) {
            return response()->json([
                'message' => 'Impossible de supprimer une catégorie qui contient des formations'
            ], 422);
        }

        $category->delete();

        return response()->json(['message' => 'Catégorie supprimée avec succès']);
    }
}
