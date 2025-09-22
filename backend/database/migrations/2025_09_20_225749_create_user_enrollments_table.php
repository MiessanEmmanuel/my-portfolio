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
        Schema::create('user_enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('formation_id')->constrained()->onDelete('cascade');
            $table->timestamp('enrolled_at')->useCurrent();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamp('last_accessed_at')->nullable();
            $table->decimal('progress_percentage', 5, 2)->default(0.00);
            $table->integer('time_spent_seconds')->default(0);
            $table->unsignedBigInteger('current_lesson_id')->nullable();
            $table->boolean('is_completed')->default(false);
            $table->decimal('completion_rate', 5, 2)->default(0.00);
            $table->timestamp('certificate_issued_at')->nullable();
            $table->string('certificate_url', 500)->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->unique(['user_id', 'formation_id']);
            $table->index('user_id');
            $table->index('formation_id');
            $table->index('progress_percentage');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_enrollments');
    }
};
