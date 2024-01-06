<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Avatar extends Model
{
    use HasFactory;

    protected $connection = 'pgsql';

    protected $fillable = [
        'cost',
        'image'
    ];

    public function player(): HasMany
    {
        return $this->hasMany(Player::class, 'active_avatar', 'image');
    }

    public function user_avatar(): HasMany
    {
        return $this->hasMany(UserAvatar::class);
    }
}
