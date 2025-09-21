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
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('email', 255);
            $table->string('company', 100)->nullable();
            $table->string('subject', 200);
            $table->text('message');
            $table->enum('budget', ['1k-5k', '5k-10k', '10k-25k', '25k+'])->nullable();
            $table->enum('timeline', ['asap', '1month', '3months', 'flexible'])->nullable();
            $table->enum('status', ['new', 'read', 'replied', 'closed'])->default('new');
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamp('replied_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
    }
};
