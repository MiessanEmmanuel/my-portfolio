<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Exercise;
use App\Models\Formation;
use App\Models\UserExerciseProgress;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ExerciseController extends Controller
{
    public function indexByFormation(Formation $formation): JsonResponse
    {
        $exercises = $formation->exercises()
                             ->with('resources')
                             ->orderBy('display_order')
                             ->get();

        return response()->json($exercises);
    }

    public function show(Exercise $exercise, Request $request): JsonResponse
    {
        $exercise->load('resources');

        if ($request->user()) {
            $progress = UserExerciseProgress::where('user_id', $request->user()->id)
                                          ->where('exercise_id', $exercise->id)
                                          ->first();
            $exercise->user_progress = $progress;
        }

        return response()->json($exercise);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'formation_id' => 'required|exists:formations,id',
            'title' => 'required|string|max:200',
            'slug' => 'required|string|max:200',
            'description' => 'required|string',
            'instructions' => 'nullable|string',
            'difficulty' => 'required|in:Facile,Moyen,Difficile',
            'estimated_time' => 'nullable|string|max:50',
            'type' => 'required|in:Pratique,Projet,Théorie',
            'status' => 'required|in:available,locked,completed',
            'code_template' => 'nullable|string',
            'solution' => 'nullable|string',
            'display_order' => 'integer|min:0',
        ]);

        $exercise = Exercise::create($request->all());

        // Update formation total_exercises count
        $formation = Formation::find($request->formation_id);
        $formation->update([
            'total_exercises' => $formation->exercises()->count()
        ]);

        return response()->json($exercise->load('resources'), 201);
    }

    public function update(Request $request, Exercise $exercise): JsonResponse
    {
        $request->validate([
            'formation_id' => 'required|exists:formations,id',
            'title' => 'required|string|max:200',
            'slug' => 'required|string|max:200',
            'description' => 'required|string',
            'instructions' => 'nullable|string',
            'difficulty' => 'required|in:Facile,Moyen,Difficile',
            'estimated_time' => 'nullable|string|max:50',
            'type' => 'required|in:Pratique,Projet,Théorie',
            'status' => 'required|in:available,locked,completed',
            'code_template' => 'nullable|string',
            'solution' => 'nullable|string',
            'display_order' => 'integer|min:0',
        ]);

        $exercise->update($request->all());

        return response()->json($exercise->load('resources'));
    }

    public function destroy(Exercise $exercise): JsonResponse
    {
        $formationId = $exercise->formation_id;
        $exercise->delete();

        // Update formation total_exercises count
        $formation = Formation::find($formationId);
        $formation->update([
            'total_exercises' => $formation->exercises()->count()
        ]);

        return response()->json(['message' => 'Exercise deleted successfully']);
    }

    public function submit(Request $request, Exercise $exercise): JsonResponse
    {
        $request->validate([
            'code_submission' => 'nullable|string',
            'notes' => 'nullable|string',
            'status' => 'required|in:not_started,in_progress,completed',
        ]);

        $user = $request->user();

        $progress = UserExerciseProgress::updateOrCreate([
            'user_id' => $user->id,
            'exercise_id' => $exercise->id,
        ], [
            'status' => $request->status,
            'code_submission' => $request->code_submission,
            'notes' => $request->notes,
            'completed_at' => $request->status === 'completed' ? now() : null,
        ]);

        // Update formation progress if exercise is completed
        if ($request->status === 'completed') {
            $this->updateFormationProgress($user->id, $exercise->formation_id);
        }

        return response()->json([
            'message' => 'Exercise progress updated successfully',
            'progress' => $progress,
        ]);
    }

    public function myProgress(Request $request): JsonResponse
    {
        $user = $request->user();

        $progress = UserExerciseProgress::where('user_id', $user->id)
                                      ->with(['exercise.formation'])
                                      ->orderBy('updated_at', 'desc')
                                      ->get();

        return response()->json($progress);
    }

    private function updateFormationProgress(int $userId, int $formationId): void
    {
        $totalExercises = Exercise::where('formation_id', $formationId)->count();

        $completedExercises = UserExerciseProgress::whereHas('exercise', function($query) use ($formationId) {
            $query->where('formation_id', $formationId);
        })
        ->where('user_id', $userId)
        ->where('status', 'completed')
        ->count();

        $progressPercentage = $totalExercises > 0 ? ($completedExercises / $totalExercises) * 100 : 0;

        $enrollment = \App\Models\UserEnrollment::where('user_id', $userId)
                                               ->where('formation_id', $formationId)
                                               ->first();

        if ($enrollment) {
            $enrollment->update([
                'progress_percentage' => round($progressPercentage, 2),
                'completed_at' => $progressPercentage == 100 ? now() : null,
            ]);
        }
    }
}
