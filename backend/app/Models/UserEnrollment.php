<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserEnrollment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'formation_id',
        'enrolled_at',
        'started_at',
        'completed_at',
        'last_accessed_at',
        'progress_percentage',
        'time_spent_seconds',
        'current_lesson_id',
        'is_completed',
        'completion_rate',
        'certificate_issued_at',
        'certificate_url',
        'notes'
    ];

    protected $casts = [
        'enrolled_at' => 'datetime',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'last_accessed_at' => 'datetime',
        'certificate_issued_at' => 'datetime',
        'progress_percentage' => 'decimal:2',
        'completion_rate' => 'decimal:2',
        'time_spent_seconds' => 'integer',
        'is_completed' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }

    public function currentLesson()
    {
        return $this->belongsTo(FormationLesson::class, 'current_lesson_id');
    }

    public function lessonProgress()
    {
        return $this->hasMany(LessonProgress::class, 'enrollment_id');
    }

    public function certificate()
    {
        return $this->hasOne(Certificate::class, 'enrollment_id');
    }

    public function scopeCompleted($query)
    {
        return $query->where('is_completed', true);
    }

    public function scopeInProgress($query)
    {
        return $query->where('is_completed', false)->whereNotNull('started_at');
    }

    public function getFormattedTimeSpentAttribute()
    {
        $hours = floor($this->time_spent_seconds / 3600);
        $minutes = floor(($this->time_spent_seconds % 3600) / 60);
        
        if ($hours > 0) {
            return $hours . 'h ' . $minutes . 'min';
        }
        
        return $minutes . 'min';
    }
}