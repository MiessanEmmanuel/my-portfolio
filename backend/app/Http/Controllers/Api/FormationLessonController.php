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
    public function show(FormationLesson $lesson): JsonResponse
    {
        $lesson->load(['chapter.formation', 'progress' => function($query) {
            $query->where('user_id', auth()->id());
        }]);

        return response()->json($lesson);
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

    public function update(Request $request, FormationLesson $lesson): JsonResponse
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

        $lesson->update($request->all());

        return response()->json($lesson);
    }

    public function destroy(FormationLesson $lesson): JsonResponse
    {
        $lesson->delete();

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
