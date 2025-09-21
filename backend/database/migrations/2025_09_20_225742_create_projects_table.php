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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title', 200);
            $table->string('slug', 200)->unique();
            $table->string('category', 100);
            $table->text('description');
            $table->text('long_description')->nullable();
            $table->string('image', 500)->nullable();
            $table->string('live_url', 500)->nullable();
            $table->string('github_url', 500)->nullable();
            $table->enum('status', ['Terminé', 'En cours', 'En pause'])->default('En cours');
            $table->year('date_completed')->nullable();
            $table->string('client', 100)->nullable();
            $table->string('duration', 50)->nullable();
            $table->boolean('featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
