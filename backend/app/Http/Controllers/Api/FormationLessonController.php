<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FormationLesson;
use App\Models\FormationChapter;
use App\Models\LessonProgress;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FormationLessonController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = FormationLesson::with(['chapter.formation', 'progress' => function($q) {
            $q->where('user_id', auth()->id());
        }]);

        // Filtrer par formation
        if ($request->has('formation_id')) {
            $query->whereHas('chapter.formation', function($q) use ($request) {
                $q->where('id', $request->formation_id);
            });
        }

        // Filtrer par chapitre
        if ($request->has('chapter_id')) {
            $query->where('chapter_id', $request->chapter_id);
        }

        // Filtrer par type
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Filtrer par statut publié
        if ($request->boolean('published_only', true)) {
            $query->published();
        }

        // Filtrer les leçons gratuites seulement
        if ($request->boolean('free_only')) {
            $query->where('is_free', true);
        }

        // Recherche par titre
        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Tri
        $sortBy = $request->get('sort_by', 'sort_order');
        $sortOrder = $request->get('sort_order', 'asc');
        
        if (in_array($sortBy, ['title', 'created_at', 'sort_order', 'estimated_time_minutes'])) {
            $query->orderBy($sortBy, $sortOrder);
        } else {
            $query->orderBy('sort_order', 'asc');
        }

        // Pagination
        $perPage = min($request->get('per_page', 15), 100);
        $lessons = $query->paginate($perPage);

        return response()->json($lessons);
    }

    public function show(FormationLesson $formationLesson): JsonResponse
    {

        $formationLesson->load(['chapter.formation', 'progress' => function($query) {
            $query->where('user_id', auth()->id());
        }]);

        return response()->json($formationLesson);
    }

    public function getByChapter(FormationChapter $chapter): JsonResponse
    {
        $lessons = $chapter->lessons()
            ->published()
            ->with(['progress' => function($query) {
                $query->where('user_id', auth()->id());
            }])
            ->orderBy('sort_order')
            ->get();

        return response()->json($lessons);
    }

    public function markProgress(Request $request, FormationLesson $lesson): JsonResponse
    {
        $request->validate([
            'position_seconds' => 'integer|min:0',
            'watch_time_seconds' => 'integer|min:0',
            'completion_percentage' => 'numeric|min:0|max:100',
            'is_completed' => 'boolean',
            'notes' => 'nullable|string',
            'bookmarks' => 'array'
        ]);

        $user = $request->user();
        
        $enrollment = $user->enrollments()
            ->where('formation_id', $lesson->chapter->formation_id)
            ->first();

        if (!$enrollment) {
            return response()->json([
                'message' => 'Vous devez être inscrit à cette formation'
            ], 403);
        }

        $progress = LessonProgress::updateOrCreate([
            'user_id' => $user->id,
            'lesson_id' => $lesson->id,
            'enrollment_id' => $enrollment->id,
        ], [
            'last_position_seconds' => $request->position_seconds ?? 0,
            'watch_time_seconds' => $request->watch_time_seconds ?? 0,
            'completion_percentage' => $request->completion_percentage ?? 0,
            'is_completed' => $request->is_completed ?? false,
            'notes' => $request->notes,
            'bookmarks' => $request->bookmarks ?? [],
            'started_at' => $request->started_at ?? now(),
            'completed_at' => $request->is_completed ? now() : null,
        ]);

        $enrollment->update([
            'last_accessed_at' => now(),
            'current_lesson_id' => $lesson->id
        ]);

        $this->updateFormationProgress($enrollment);

        return response()->json([
            'message' => 'Progression mise à jour',
            'progress' => $progress
        ]);
    }

    public function getNext(FormationLesson $lesson): JsonResponse
    {
        $nextLesson = FormationLesson::where('chapter_id', $lesson->chapter_id)
            ->where('sort_order', '>', $lesson->sort_order)
            ->published()
            ->orderBy('sort_order')
            ->first();

        if (!$nextLesson) {
            $nextChapter = $lesson->chapter->formation->chapters()
                ->where('sort_order', '>', $lesson->chapter->sort_order)
                ->published()
                ->orderBy('sort_order')
                ->first();

            if ($nextChapter) {
                $nextLesson = $nextChapter->lessons()
                    ->published()
                    ->orderBy('sort_order')
                    ->first();
            }
        }

        return response()->json($nextLesson);
    }

    public function getPrevious(FormationLesson $lesson): JsonResponse
    {
        $prevLesson = FormationLesson::where('chapter_id', $lesson->chapter_id)
            ->where('sort_order', '<', $lesson->sort_order)
            ->published()
            ->orderBy('sort_order', 'desc')
            ->first();

        if (!$prevLesson) {
            $prevChapter = $lesson->chapter->formation->chapters()
                ->where('sort_order', '<', $lesson->chapter->sort_order)
                ->published()
                ->orderBy('sort_order', 'desc')
                ->first();

            if ($prevChapter) {
                $prevLesson = $prevChapter->lessons()
                    ->published()
                    ->orderBy('sort_order', 'desc')
                    ->first();
            }
        }

        return response()->json($prevLesson);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'chapter_id' => 'required|exists:formation_chapters,id',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'content' => 'required|string',
            'long_description' => 'nullable|string',
            'video_url' => 'nullable|url',
            'exercise_url' => 'nullable|url',
            'estimated_time_minutes' => 'integer|min:1',
            'sort_order' => 'integer|min:0',
            'is_free' => 'boolean',
            'type' => 'required|in:video,exercise,quiz,text'
        ]);

        $lesson = FormationLesson::create($request->all());

        return response()->json($lesson, 201);
    }

    public function update(Request $request, FormationLesson $formationLesson): JsonResponse
    {
        $request->validate([
            'chapter_id' => 'required|exists:formation_chapters,id',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'content' => 'required|string',
            'long_description' => 'nullable|string',
            'video_url' => 'nullable|url',
            'exercise_url' => 'nullable|url',
            'estimated_time_minutes' => 'integer|min:1',
            'sort_order' => 'integer|min:0',
            'is_free' => 'boolean',
            'type' => 'required|in:video,exercise,quiz,text'
        ]);

        $formationLesson->update($request->all());

        return response()->json($formationLesson);
    }

    public function destroy(FormationLesson $formationLesson): JsonResponse
    {
        $formationLesson->delete();

        return response()->json(['message' => 'Leçon supprimée avec succès']);
    }

    private function updateFormationProgress($enrollment)
    {
        $formation = $enrollment->formation;
        $totalLessons = $formation->lessons()->published()->count();
        $completedLessons = LessonProgress::where('enrollment_id', $enrollment->id)
            ->where('is_completed', true)
            ->count();

        $progressPercentage = $totalLessons > 0 ? ($completedLessons / $totalLessons) * 100 : 0;
        $isCompleted = $progressPercentage >= 100;

        $enrollment->update([
            'progress_percentage' => $progressPercentage,
            'is_completed' => $isCompleted,
            'completed_at' => $isCompleted ? now() : null
        ]);
    }
}
