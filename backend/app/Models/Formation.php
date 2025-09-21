<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Formation extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'duration',
        'level',
        'color',
        'icon',
        'total_exercises',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function exercises(): HasMany
    {
        return $this->hasMany(Exercise::class)->orderBy('display_order');
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(UserEnrollment::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_enrollments')
                    ->withPivot('enrolled_at', 'completed_at', 'progress_percentage')
                    ->withTimestamps();
    }
}
