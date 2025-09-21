<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Exercise extends Model
{
    use HasFactory;

    protected $fillable = [
        'formation_id',
        'title',
        'slug',
        'description',
        'instructions',
        'difficulty',
        'estimated_time',
        'type',
        'status',
        'code_template',
        'solution',
        'display_order',
    ];

    public function formation(): BelongsTo
    {
        return $this->belongsTo(Formation::class);
    }

    public function resources(): HasMany
    {
        return $this->hasMany(ExerciseResource::class)->orderBy('display_order');
    }

    public function userProgress(): HasMany
    {
        return $this->hasMany(UserExerciseProgress::class);
    }
}
