<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormationChapter extends Model
{
    use HasFactory;

    protected $fillable = [
        'formation_id',
        'title',
        'description',
        'sort_order',
        'duration_minutes',
        'is_published'
    ];

    protected $casts = [
        'sort_order' => 'integer',
        'duration_minutes' => 'integer',
        'is_published' => 'boolean'
    ];

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }

    public function lessons()
    {
        return $this->hasMany(FormationLesson::class, 'chapter_id')->orderBy('sort_order');
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function getFormattedDurationAttribute()
    {
        $hours = floor($this->duration_minutes / 60);
        $minutes = $this->duration_minutes % 60;
        
        if ($hours > 0) {
            return $hours . 'h' . ($minutes > 0 ? ' ' . $minutes . 'min' : '');
        }
        
        return $minutes . 'min';
    }
}