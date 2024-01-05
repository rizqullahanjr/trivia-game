<?php /** @noinspection PhpMissingFieldTypeInspection */

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
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

}
