<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonProgress extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'lesson_id',
        'enrollment_id',
        'started_at',
        'completed_at',
        'last_position_seconds',
        'watch_time_seconds',
        'completion_percentage',
        'is_completed',
        'notes',
        'bookmarks'
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'last_position_seconds' => 'integer',
        'watch_time_seconds' => 'integer',
        'completion_percentage' => 'decimal:2',
        'is_completed' => 'boolean',
        'bookmarks' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function lesson()
    {
        return $this->belongsTo(FormationLesson::class, 'lesson_id');
    }

    public function enrollment()
    {
        return $this->belongsTo(UserEnrollment::class, 'enrollment_id');
    }

    public function scopeCompleted($query)
    {
        return $query->where('is_completed', true);
    }

    public function getFormattedLastPositionAttribute()
    {
        $minutes = floor($this->last_position_seconds / 60);
        $seconds = $this->last_position_seconds % 60;
        return sprintf('%d:%02d', $minutes, $seconds);
    }

    public function getFormattedWatchTimeAttribute()
    {
        $minutes = floor($this->watch_time_seconds / 60);
        $seconds = $this->watch_time_seconds % 60;
        return sprintf('%d:%02d', $minutes, $seconds);
    }
}