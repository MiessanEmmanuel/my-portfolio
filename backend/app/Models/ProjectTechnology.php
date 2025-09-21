<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectTechnology extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'technology_id',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function technology(): BelongsTo
    {
        return $this->belongsTo(Technology::class);
    }
}
