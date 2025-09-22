<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('formation_lessons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('formation_id')->constrained()->onDelete('cascade');
            $table->foreignId('chapter_id')->nullable()->constrained('formation_chapters')->onDelete('set null');
            $table->string('title', 255);
            $table->string('slug', 255);
            $table->text('description')->nullable();
            $table->text('long_description')->nullable(); // Contenu HTML riche pour les leçons
            $table->text('content')->nullable(); // Contenu markdown pour les leçons texte
            $table->enum('type', ['video', 'text', 'exercise', 'quiz', 'live'])->default('video');
            $table->string('video_url', 500)->nullable();
            $table->integer('video_duration_seconds')->nullable();
            $table->enum('video_quality', ['720p', '1080p', '4k'])->default('1080p');
            $table->string('exercise_url', 500)->nullable(); // URL de l'exercice principal
            $table->string('exercise_github_url', 500)->nullable();
            $table->string('exercise_sandbox_url', 500)->nullable();
            $table->json('resources')->nullable(); // [{"title": "Slides", "url": "...", "type": "pdf"}]
            $table->integer('sort_order')->default(0);
            $table->boolean('is_free')->default(false);
            $table->boolean('is_published')->default(true);
            $table->integer('difficulty')->default(1); // 1-5
            $table->integer('estimated_time_minutes')->default(0);
            $table->text('transcription')->nullable();
            $table->timestamps();
            
            $table->index('formation_id');
            $table->index('chapter_id');
            $table->index('type');
            $table->unique(['formation_id', 'slug']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formation_lessons');
    }
};