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
        Schema::create('lesson_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('lesson_id')->constrained('formation_lessons')->onDelete('cascade');
            $table->foreignId('enrollment_id')->constrained('user_enrollments')->onDelete('cascade');
            $table->timestamp('started_at')->useCurrent();
            $table->timestamp('completed_at')->nullable();
            $table->integer('last_position_seconds')->default(0); // Position de la vidéo
            $table->integer('watch_time_seconds')->default(0);
            $table->decimal('completion_percentage', 5, 2)->default(0.00);
            $table->boolean('is_completed')->default(false);
            $table->text('notes')->nullable();
            $table->json('bookmarks')->nullable(); // [{"time": 120, "note": "Important point"}]
            $table->timestamps();
            
            $table->unique(['user_id', 'lesson_id']);
            $table->index('user_id');
            $table->index('lesson_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lesson_progress');
    }
};