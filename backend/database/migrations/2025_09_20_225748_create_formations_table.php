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
        Schema::create('formations', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->string('slug', 255)->unique();
            $table->text('description');
            $table->text('long_description')->nullable();
            $table->string('image', 500)->nullable();
            $table->string('trailer_video_url', 500)->nullable();
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('instructor_id');
            $table->enum('level', ['Débutant', 'Intermédiaire', 'Avancé', 'Expert']);
            $table->integer('duration_total_minutes')->default(0); // Durée totale en minutes
            $table->decimal('price', 8, 2)->default(0.00);
            $table->decimal('discount_price', 8, 2)->nullable();
            $table->boolean('is_free')->default(false);
            $table->boolean('is_premium')->default(false);
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->integer('difficulty_score')->default(1); // 1-10
            $table->decimal('rating', 3, 2)->default(0.00);
            $table->integer('students_count')->default(0);
            $table->integer('reviews_count')->default(0);
            $table->decimal('completion_rate', 5, 2)->default(0.00);
            $table->json('requirements')->nullable(); // ["JavaScript ES6+", "Node.js"]
            $table->json('objectives')->nullable(); // ["Maîtriser React", "Créer des apps"]
            $table->json('technologies')->nullable(); // ["React", "Redux", "Next.js"]
            $table->boolean('has_certificate')->default(true);
            $table->string('certificate_template_url', 500)->nullable();
            $table->timestamp('featured_at')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            
            $table->index('category_id');
            $table->index('instructor_id');
            $table->index('status');
            $table->index('published_at');
            $table->index('featured_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formations');
    }
};
