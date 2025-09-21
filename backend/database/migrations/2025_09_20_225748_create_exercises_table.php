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
        Schema::create('exercises', function (Blueprint $table) {
            $table->id();
            $table->foreignId('formation_id')->constrained()->onDelete('cascade');
            $table->string('title', 200);
            $table->string('slug', 200);
            $table->text('description');
            $table->text('instructions')->nullable();
            $table->enum('difficulty', ['Facile', 'Moyen', 'Difficile'])->default('Facile');
            $table->string('estimated_time', 50)->nullable();
            $table->enum('type', ['Pratique', 'Projet', 'Théorie'])->default('Pratique');
            $table->enum('status', ['available', 'locked', 'completed'])->default('locked');
            $table->text('code_template')->nullable();
            $table->text('solution')->nullable();
            $table->integer('display_order')->default(0);
            $table->unique(['formation_id', 'slug']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exercises');
    }
};
