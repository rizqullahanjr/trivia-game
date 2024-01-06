<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Player extends Model
{
    use HasFactory;

    protected $connection = 'pgsql';

    protected $fillable = [
        'user_id',
        'name',
        'active_avatar',
        'diamond',
        'highest_score',
        'total_score'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id', 'id');
    }

    public function avatar(): BelongsTo
    {
        return $this->belongsTo(Avatar::class, 'active_avatar', 'image');
    }

    public function user_avatar(): HasMany
    {
        return $this->hasMany(UserAvatar::class);
    }
}
