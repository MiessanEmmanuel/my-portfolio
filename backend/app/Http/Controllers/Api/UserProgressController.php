<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserEnrollment;
use App\Models\LessonProgress;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class UserProgressController extends Controller
{
    public function dashboard(Request $request): JsonResponse
    {
        $user = $request->user();

        $stats = [
            'total_enrollments' => $user->enrollments()->count(),
            'completed_formations' => $user->enrollments()->completed()->count(),
            'in_progress_formations' => $user->enrollments()->inProgress()->count(),
            'total_certificates' => $user->certificates()->count(),
            'total_watch_time' => $user->enrollments()->sum('time_spent_seconds'),
            'total_lessons_completed' => LessonProgress::where('user_id', $user->id)
                ->where('is_completed', true)
                ->count(),
        ];

        $recent_activity = $user->enrollments()
            ->with(['formation', 'currentLesson'])
            ->orderBy('last_accessed_at', 'desc')
            ->limit(5)
            ->get();

        $achievements = $this->getUserAchievements($user);

        return response()->json([
            'stats' => $stats,
            'recent_activity' => $recent_activity,
            'achievements' => $achievements
        ]);
    }

    public function enrollments(Request $request): JsonResponse
    {
        $user = $request->user();
        $status = $request->get('status', 'all');

        $query = $user->enrollments()
            ->with(['formation.category', 'formation.instructor.user', 'currentLesson']);

        switch ($status) {
            case 'completed':
                $query->completed();
                break;
            case 'in_progress':
                $query->inProgress();
                break;
            case 'not_started':
                $query->whereNull('started_at');
                break;
        }

        $enrollments = $query->orderBy('last_accessed_at', 'desc')
            ->paginate(10);

        return response()->json($enrollments);
    }

    public function formationProgress(Request $request, $formationSlug): JsonResponse
    {
        $user = $request->user();
        
        $enrollment = $user->enrollments()
            ->whereHas('formation', function($query) use ($formationSlug) {
                $query->where('slug', $formationSlug);
            })
            ->with([
                'formation.chapters.lessons',
                'lessonProgress.lesson'
            ])
            ->firstOrFail();

        $formation = $enrollment->formation;
        
        $chapters_progress = $formation->chapters->map(function($chapter) use ($enrollment) {
            $lessons = $chapter->lessons;
            $completed_lessons = $enrollment->lessonProgress()
                ->whereIn('lesson_id', $lessons->pluck('id'))
                ->where('is_completed', true)
                ->count();
            
            return [
                'chapter' => $chapter,
                'total_lessons' => $lessons->count(),
                'completed_lessons' => $completed_lessons,
                'progress_percentage' => $lessons->count() > 0 ? 
                    ($completed_lessons / $lessons->count()) * 100 : 0,
                'lessons' => $lessons->map(function($lesson) use ($enrollment) {
                    $progress = $enrollment->lessonProgress()
                        ->where('lesson_id', $lesson->id)
                        ->first();
                    
                    return [
                        'lesson' => $lesson,
                        'progress' => $progress
                    ];
                })
            ];
        });

        return response()->json([
            'enrollment' => $enrollment,
            'chapters_progress' => $chapters_progress
        ]);
    }

    public function lessonProgress(Request $request, $lessonId): JsonResponse
    {
        $user = $request->user();
        
        $progress = LessonProgress::where('user_id', $user->id)
            ->where('lesson_id', $lessonId)
            ->with(['lesson.chapter.formation', 'enrollment'])
            ->first();

        if (!$progress) {
            return response()->json([
                'message' => 'Aucune progression trouvée pour cette leçon'
            ], 404);
        }

        return response()->json($progress);
    }

    public function certificates(Request $request): JsonResponse
    {
        $user = $request->user();
        
        $certificates = $user->certificates()
            ->with(['formation', 'enrollment'])
            ->orderBy('issued_at', 'desc')
            ->get();

        return response()->json($certificates);
    }

    public function generateCertificate(Request $request, $formationSlug): JsonResponse
    {
        $user = $request->user();
        
        $enrollment = $user->enrollments()
            ->whereHas('formation', function($query) use ($formationSlug) {
                $query->where('slug', $formationSlug);
            })
            ->with('formation')
            ->firstOrFail();

        if (!$enrollment->is_completed) {
            return response()->json([
                'message' => 'Vous devez terminer la formation pour obtenir le certificat'
            ], 422);
        }

        $existingCertificate = Certificate::where('enrollment_id', $enrollment->id)->first();
        if ($existingCertificate) {
            return response()->json([
                'message' => 'Certificat déjà généré',
                'certificate' => $existingCertificate
            ]);
        }

        $certificate = Certificate::create([
            'user_id' => $user->id,
            'formation_id' => $enrollment->formation_id,
            'enrollment_id' => $enrollment->id,
            'certificate_number' => Certificate::generateCertificateNumber(),
            'issued_at' => now(),
            'grade' => 'Completed',
            'final_score' => $enrollment->completion_rate,
            'is_verified' => true
        ]);

        $enrollment->update([
            'certificate_issued_at' => now(),
            'certificate_url' => "/certificates/{$certificate->certificate_number}"
        ]);

        return response()->json([
            'message' => 'Certificat généré avec succès',
            'certificate' => $certificate
        ], 201);
    }

    public function weeklyStats(Request $request): JsonResponse
    {
        $user = $request->user();
        
        $stats = DB::table('lesson_progress')
            ->select(
                DB::raw('DATE(completed_at) as date'),
                DB::raw('COUNT(*) as lessons_completed'),
                DB::raw('SUM(watch_time_seconds) as total_watch_time')
            )
            ->where('user_id', $user->id)
            ->where('is_completed', true)
            ->where('completed_at', '>=', now()->subWeek())
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return response()->json($stats);
    }

    private function getUserAchievements($user)
    {
        $achievements = [];
        
        $completedFormations = $user->enrollments()->completed()->count();
        $totalLessons = LessonProgress::where('user_id', $user->id)
            ->where('is_completed', true)
            ->count();
        $totalWatchTime = $user->enrollments()->sum('time_spent_seconds');
        
        if ($completedFormations >= 1) {
            $achievements[] = [
                'title' => 'Première formation terminée',
                'description' => 'Félicitations pour votre première formation complétée !',
                'icon' => '🎓',
                'earned_at' => $user->enrollments()->completed()->first()->completed_at
            ];
        }
        
        if ($completedFormations >= 5) {
            $achievements[] = [
                'title' => 'Apprenant dévoué',
                'description' => '5 formations terminées',
                'icon' => '🏆',
                'earned_at' => $user->enrollments()->completed()->skip(4)->first()->completed_at
            ];
        }
        
        if ($totalLessons >= 50) {
            $achievements[] = [
                'title' => 'Marathonien',
                'description' => '50 leçons terminées',
                'icon' => '🏃‍♂️'
            ];
        }
        
        if ($totalWatchTime >= 36000) { // 10 heures
            $achievements[] = [
                'title' => 'Spectateur assidu',
                'description' => '10 heures de visionnage',
                'icon' => '⏰'
            ];
        }
        
        return $achievements;
    }
}
