<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Formation;
use App\Models\UserEnrollment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FormationController extends Controller
{
    public function index(): JsonResponse
    {
        $formations = Formation::where('is_active', true)
                              ->with(['exercises' => function($query) {
                                  $query->orderBy('display_order');
                              }])
                              ->orderBy('level')
                              ->orderBy('title')
                              ->get();

        return response()->json($formations);
    }

    public function show(Formation $formation): JsonResponse
    {
        $formation->load(['exercises' => function($query) {
            $query->orderBy('display_order')->with('resources');
        }]);

        return response()->json($formation);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:200',
            'slug' => 'required|string|max:200|unique:formations',
            'description' => 'required|string',
            'duration' => 'nullable|string|max:50',
            'level' => 'required|in:Débutant,Intermédiaire,Avancé',
            'color' => 'nullable|string|max:100',
            'icon' => 'nullable|string|max:10',
            'is_active' => 'boolean',
        ]);

        $formation = Formation::create($request->all());

        return response()->json($formation, 201);
    }

    public function update(Request $request, Formation $formation): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:200',
            'slug' => 'required|string|max:200|unique:formations,slug,' . $formation->id,
            'description' => 'required|string',
            'duration' => 'nullable|string|max:50',
            'level' => 'required|in:Débutant,Intermédiaire,Avancé',
            'color' => 'nullable|string|max:100',
            'icon' => 'nullable|string|max:10',
            'is_active' => 'boolean',
        ]);

        $formation->update($request->all());

        return response()->json($formation);
    }

    public function destroy(Formation $formation): JsonResponse
    {
        $formation->delete();

        return response()->json(['message' => 'Formation deleted successfully']);
    }

    public function enroll(Request $request, Formation $formation): JsonResponse
    {
        $user = $request->user();

        $enrollment = UserEnrollment::firstOrCreate([
            'user_id' => $user->id,
            'formation_id' => $formation->id,
        ], [
            'enrolled_at' => now(),
            'progress_percentage' => 0,
        ]);

        if ($enrollment->wasRecentlyCreated) {
            return response()->json([
                'message' => 'Successfully enrolled in formation',
                'enrollment' => $enrollment,
            ], 201);
        }

        return response()->json([
            'message' => 'Already enrolled in this formation',
            'enrollment' => $enrollment,
        ]);
    }

    public function myFormations(Request $request): JsonResponse
    {
        $user = $request->user();

        $enrollments = UserEnrollment::where('user_id', $user->id)
                                   ->with(['formation.exercises'])
                                   ->orderBy('enrolled_at', 'desc')
                                   ->get();

        return response()->json($enrollments);
    }
}
