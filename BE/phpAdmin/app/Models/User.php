<?php /** @noinspection PhpMissingFieldTypeInspection */

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * @method static where(string $string, string $string1, string $string2)
 * @method static create(array $array)
 * @property int $id
 */
class User extends Authenticatable
{
    protected $connection = 'pgsql';

    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    /*
     * @var integer
     */
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     *
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'provider_id',
        'provider_name',
        'google_access_token_json',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
      'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function player(): HasOne
    {
        return $this->hasOne(Player::class, 'id', 'id');
    }




}
