<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'formation_id',
        'enrollment_id',
        'certificate_number',
        'issued_at',
        'grade',
        'final_score',
        'certificate_url',
        'is_verified',
        'metadata'
    ];

    protected $casts = [
        'issued_at' => 'datetime',
        'final_score' => 'decimal:2',
        'is_verified' => 'boolean',
        'metadata' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }

    public function enrollment()
    {
        return $this->belongsTo(UserEnrollment::class, 'enrollment_id');
    }

    public function scopeVerified($query)
    {
        return $query->where('is_verified', true);
    }

    public function getFormattedIssuedDateAttribute()
    {
        return $this->issued_at->format('d/m/Y');
    }

    public static function generateCertificateNumber()
    {
        return 'CERT-' . strtoupper(uniqid()) . '-' . date('Y');
    }
}