<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instructor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'specialties',
        'experience_years',
        'formations_count',
        'students_count',
        'rating',
        'total_reviews',
        'is_featured',
        'bio_long'
    ];

    protected $casts = [
        'specialties' => 'array',
        'experience_years' => 'integer',
        'formations_count' => 'integer',
        'students_count' => 'integer',
        'rating' => 'decimal:2',
        'total_reviews' => 'integer',
        'is_featured' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function formations()
    {
        return $this->hasMany(Formation::class);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}