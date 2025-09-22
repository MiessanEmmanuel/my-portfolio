<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormationLesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'formation_id',
        'chapter_id',
        'title',
        'slug',
        'description',
        'long_description',
        'content',
        'type',
        'video_url',
        'video_duration_seconds',
        'video_quality',
        'exercise_url',
        'exercise_github_url',
        'exercise_sandbox_url',
        'resources',
        'sort_order',
        'is_free',
        'is_published',
        'difficulty',
        'estimated_time_minutes',
        'transcription'
    ];

    protected $casts = [
        'resources' => 'array',
        'sort_order' => 'integer',
        'is_free' => 'boolean',
        'is_published' => 'boolean',
        'difficulty' => 'integer',
        'estimated_time_minutes' => 'integer',
        'video_duration_seconds' => 'integer'
    ];

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }

    public function chapter()
    {
        return $this->belongsTo(FormationChapter::class, 'chapter_id');
    }

    public function progress()
    {
        return $this->hasMany(LessonProgress::class, 'lesson_id');
    }

    public function userProgress($userId = null)
    {
        $userId = $userId ?? auth()->id();
        return $this->hasOne(LessonProgress::class, 'lesson_id')->where('user_id', $userId);
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function scopeFree($query)
    {
        return $query->where('is_free', true);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function getFormattedDurationAttribute()
    {
        if ($this->video_duration_seconds) {
            $minutes = floor($this->video_duration_seconds / 60);
            $seconds = $this->video_duration_seconds % 60;
            return sprintf('%d:%02d', $minutes, $seconds);
        }
        
        if ($this->estimated_time_minutes) {
            return $this->estimated_time_minutes . ' min';
        }
        
        return null;
    }

    public function getIsCompletedAttribute()
    {
        if (auth()->check()) {
            $progress = $this->userProgress(auth()->id())->first();
            return $progress ? $progress->is_completed : false;
        }
        return false;
    }
}