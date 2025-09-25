<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TechnologyController;
use App\Http\Controllers\Api\FormationController;
use App\Http\Controllers\Api\FormationCategoryController;
use App\Http\Controllers\Api\FormationChapterController;
use App\Http\Controllers\Api\FormationLessonController;
use App\Http\Controllers\Api\FormationReviewController;
use App\Http\Controllers\Api\UserProgressController;
use App\Http\Controllers\Api\ExerciseController;
use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\UserProfileController;

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project:slug}', [ProjectController::class, 'show']);

Route::get('/technologies', [TechnologyController::class, 'index']);

Route::get('/formations', [FormationController::class, 'index']);
Route::get('/formations/featured', [FormationController::class, 'featured']);
Route::get('/formations/{slug}', [FormationController::class, 'show']);
Route::get('/formations/{formation:slug}/exercises', [ExerciseController::class, 'indexByFormation']);

Route::get('/formation-categories', [FormationCategoryController::class, 'index']);
Route::get('/formation-categories/{category}', [FormationCategoryController::class, 'show']);

Route::get('/lessons/{lesson}', [FormationLessonController::class, 'show']);
Route::get('/lessons/{lesson}/next', [FormationLessonController::class, 'getNext']);
Route::get('/lessons/{lesson}/previous', [FormationLessonController::class, 'getPrevious']);
Route::get('/chapters/{chapter}/lessons', [FormationLessonController::class, 'getByChapter']);

Route::get('/formations/{formationSlug}/reviews', [FormationReviewController::class, 'index']);

Route::post('/contact', [ContactMessageController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::get('/auth/user', [AuthController::class, 'me']);


    Route::get('/profile', [UserProfileController::class, 'show']);
    Route::put('/profile', [UserProfileController::class, 'update']);

    // Formation enrollment and progress
    Route::post('/formations/{slug}/enroll', [FormationController::class, 'enroll']);
    Route::get('/my-formations', [FormationController::class, 'myFormations']);

    // Lesson progress tracking
    Route::post('/lessons/{lesson}/progress', [FormationLessonController::class, 'markProgress']);

    // User progress dashboard
    Route::get('/progress/dashboard', [UserProgressController::class, 'dashboard']);
    Route::get('/progress/enrollments', [UserProgressController::class, 'enrollments']);
    Route::get('/progress/formations/{formationSlug}', [UserProgressController::class, 'formationProgress']);
    Route::get('/progress/lessons/{lessonId}', [UserProgressController::class, 'lessonProgress']);
    Route::get('/progress/weekly-stats', [UserProgressController::class, 'weeklyStats']);

    // Certificates
    Route::get('/certificates', [UserProgressController::class, 'certificates']);
    Route::post('/formations/{formationSlug}/certificate', [UserProgressController::class, 'generateCertificate']);

    // Reviews
    Route::post('/formations/{formationSlug}/reviews', [FormationReviewController::class, 'store']);
    Route::get('/formations/{formationSlug}/reviews/me', [FormationReviewController::class, 'getUserReview']);
    Route::put('/reviews/{review}', [FormationReviewController::class, 'update']);
    Route::delete('/reviews/{review}', [FormationReviewController::class, 'destroy']);
    Route::post('/reviews/{review}/helpful', [FormationReviewController::class, 'markHelpful']);

    Route::get('/exercises/{exercise}', [ExerciseController::class, 'show']);
    Route::post('/exercises/{exercise}/submit', [ExerciseController::class, 'submit']);
    Route::get('/my-progress', [ExerciseController::class, 'myProgress']);
});

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('projects', ProjectController::class)->except(['']);
    Route::apiResource('technologies', TechnologyController::class)->except(['index']);
    Route::apiResource('formations', FormationController::class)->except(['']);
    Route::apiResource('formation-categories', FormationCategoryController::class);
    Route::apiResource('formation-chapters', FormationChapterController::class);
    Route::apiResource('formation-lessons', FormationLessonController::class);
    
    // Routes supplémentaires pour les chapitres
    Route::post('formation-chapters/reorder', [FormationChapterController::class, 'reorder']);
    Route::post('formation-chapters/{formationChapter}/publish', [FormationChapterController::class, 'publish']);
    Route::post('formation-chapters/{formationChapter}/unpublish', [FormationChapterController::class, 'unpublish']);
    Route::apiResource('exercises', ExerciseController::class)->except(['show']);
    Route::apiResource('contact-messages', ContactMessageController::class)->except(['store']);

    Route::get('/dashboard/stats', [UserController::class, 'dashboardStats']);
    Route::patch('/contact-messages/{contactMessage}/mark-read', [ContactMessageController::class, 'markAsRead']);
    Route::patch('/contact-messages/{contactMessage}/mark-replied', [ContactMessageController::class, 'markAsReplied']);
});
