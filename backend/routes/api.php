<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TechnologyController;
use App\Http\Controllers\Api\FormationController;
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
Route::get('/formations/{formation:slug}', [FormationController::class, 'show']);
Route::get('/formations/{formation:slug}/exercises', [ExerciseController::class, 'indexByFormation']);

Route::post('/contact', [ContactMessageController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    Route::get('/profile', [UserProfileController::class, 'show']);
    Route::put('/profile', [UserProfileController::class, 'update']);

    Route::post('/formations/{formation}/enroll', [FormationController::class, 'enroll']);
    Route::get('/my-formations', [FormationController::class, 'myFormations']);

    Route::get('/exercises/{exercise}', [ExerciseController::class, 'show']);
    Route::post('/exercises/{exercise}/submit', [ExerciseController::class, 'submit']);
    Route::get('/my-progress', [ExerciseController::class, 'myProgress']);
});

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('projects', ProjectController::class)->except(['']);
    Route::apiResource('technologies', TechnologyController::class)->except(['index']);
    Route::apiResource('formations', FormationController::class)->except([]);
    Route::apiResource('exercises', ExerciseController::class)->except(['show']);
    Route::apiResource('contact-messages', ContactMessageController::class)->except(['store']);

    Route::get('/dashboard/stats', [UserController::class, 'dashboardStats']);
    Route::patch('/contact-messages/{contactMessage}/mark-read', [ContactMessageController::class, 'markAsRead']);
    Route::patch('/contact-messages/{contactMessage}/mark-replied', [ContactMessageController::class, 'markAsReplied']);
});
