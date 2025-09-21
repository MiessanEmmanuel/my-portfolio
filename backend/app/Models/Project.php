<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'category',
        'description',
        'long_description',
        'image',
        'live_url',
        'github_url',
        'status',
        'date_completed',
        'client',
        'duration',
        'featured',
    ];

    protected function casts(): array
    {
        return [
            'featured' => 'boolean',
            'date_completed' => 'integer',
        ];
    }

    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(Technology::class, 'project_technologies');
    }

    public function features(): HasMany
    {
        return $this->hasMany(ProjectFeature::class)->orderBy('display_order');
    }

    public function gallery(): HasMany
    {
        return $this->hasMany(ProjectGallery::class)->orderBy('display_order');
    }
}
