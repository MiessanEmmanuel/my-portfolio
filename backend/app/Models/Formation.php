<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'long_description',
        'image',
        'trailer_video_url',
        'category_id',
        'instructor_id',
        'level',
        'duration_total_minutes',
        'price',
        'discount_price',
        'is_free',
        'is_premium',
        'status',
        'difficulty_score',
        'rating',
        'students_count',
        'reviews_count',
        'completion_rate',
        'requirements',
        'objectives',
        'technologies',
        'has_certificate',
        'certificate_template_url',
        'featured_at',
        'published_at'
    ];

    protected $casts = [
        'is_free' => 'boolean',
        'is_premium' => 'boolean',
        'has_certificate' => 'boolean',
        'duration_total_minutes' => 'integer',
        'difficulty_score' => 'integer',
        'students_count' => 'integer',
        'reviews_count' => 'integer',
        'price' => 'decimal:2',
        'discount_price' => 'decimal:2',
        'rating' => 'decimal:2',
        'completion_rate' => 'decimal:2',
        'requirements' => 'array',
        'objectives' => 'array',
        'technologies' => 'array',
        'featured_at' => 'datetime',
        'published_at' => 'datetime'
    ];

    // Relations
    public function category()
    {
        return $this->belongsTo(FormationCategory::class, 'category_id');
    }

    public function instructor()
    {
        return $this->belongsTo(Instructor::class);
    }

    public function chapters()
    {
        return $this->hasMany(FormationChapter::class)->orderBy('sort_order');
    }

    public function lessons()
    {
        return $this->hasMany(FormationLesson::class)->orderBy('sort_order');
    }

    public function enrollments()
    {
        return $this->hasMany(UserEnrollment::class);
    }

    public function reviews()
    {
        return $this->hasMany(FormationReview::class);
    }

    public function certificates()
    {
        return $this->hasMany(Certificate::class);
    }

    // Scopes
    public function scopePublished($query)
    {
        return $query->where('status', 'published')->whereNotNull('published_at');
    }

    public function scopeFeatured($query)
    {
        return $query->whereNotNull('featured_at')->orderBy('featured_at', 'desc');
    }

    public function scopeFree($query)
    {
        return $query->where('is_free', true);
    }

    public function scopePremium($query)
    {
        return $query->where('is_premium', true);
    }

    public function scopeByLevel($query, $level)
    {
        return $query->where('level', $level);
    }

    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    // Accessors
    public function getFormattedPriceAttribute()
    {
        if ($this->is_free) {
            return 'Gratuit';
        }
        
        if ($this->discount_price) {
            return $this->discount_price . '€';
        }

        return $this->price . '€';
    }

    public function getFormattedDurationAttribute()
    {
        $hours = floor($this->duration_total_minutes / 60);
        $minutes = $this->duration_total_minutes % 60;
        
        if ($hours > 0) {
            return $hours . 'h' . ($minutes > 0 ? ' ' . $minutes . 'min' : '');
        }
        
        return $minutes . 'min';
    }
}