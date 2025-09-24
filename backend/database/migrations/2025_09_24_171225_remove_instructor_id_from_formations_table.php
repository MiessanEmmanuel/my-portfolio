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
        Schema::table('formations', function (Blueprint $table) {
            // Vérifier si la colonne existe avant de la supprimer
            if (Schema::hasColumn('formations', 'instructor_id')) {
                // Supprimer seulement la colonne, sans la contrainte
                $table->dropColumn('instructor_id');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('formations', function (Blueprint $table) {
            // Recréer la colonne
            $table->unsignedBigInteger('instructor_id')->nullable();
            // Recréer la clé étrangère si nécessaire
            $table->foreign('instructor_id')->references('id')->on('instructors')->onDelete('set null');
        });
    }
};
