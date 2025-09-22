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
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('formation_id')->constrained()->onDelete('cascade');
            $table->foreignId('enrollment_id')->constrained('user_enrollments')->onDelete('cascade');
            $table->string('certificate_number', 100)->unique();
            $table->timestamp('issued_at')->useCurrent();
            $table->string('grade', 10)->nullable(); // A+, A, B+, B, C
            $table->decimal('final_score', 5, 2)->nullable();
            $table->string('certificate_url', 500)->nullable();
            $table->boolean('is_verified')->default(true);
            $table->json('metadata')->nullable(); // Informations supplémentaires
            $table->timestamps();
            
            $table->unique(['user_id', 'formation_id']);
            $table->index('user_id');
            $table->index('formation_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};