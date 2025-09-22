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
        Schema::table('users', function (Blueprint $table) {
            // Add missing fields for instructors
            $table->text('bio')->nullable()->after('avatar');
            $table->boolean('is_premium')->default(false)->after('role');
            $table->string('github_username', 100)->nullable()->after('is_premium');
            $table->string('twitter_username', 100)->nullable()->after('github_username');
            $table->string('website_url', 500)->nullable()->after('twitter_username');
            $table->timestamp('email_verified_at')->nullable()->after('email');
        });
        
        // Update role enum to include instructor
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });
        
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['user', 'instructor', 'admin'])->default('user')->after('bio');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'bio',
                'is_premium',
                'github_username',
                'twitter_username',
                'website_url',
                'email_verified_at'
            ]);
        });
        
        // Restore original role enum
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });
        
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'user'])->default('user');
        });
    }
};