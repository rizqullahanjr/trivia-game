<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/




Route::middleware(['auth:api'])->group(function () {
    // Player
    Route::post('/player/register', '\App\Http\Controllers\PlayerController@register');
    Route::get('/players', '\App\Http\Controllers\PlayerController@findall');
    Route::get('/player', '\App\Http\Controllers\PlayerController@findbyid');
    Route::put('/player/add-diamond', '\App\Http\Controllers\PlayerController@addDiamond');
    Route::put('/player/reduce-diamond', '\App\Http\Controllers\PlayerController@reduceDiamond');
    Route::put('/player/update-score', '\App\Http\Controllers\PlayerController@updateScore');
    Route::put('/player/update-avatar', '\App\Http\Controllers\PlayerController@updateAvatar');
    Route::post('/player/buy-avatar', '\App\Http\Controllers\PlayerController@buyAvatar');

});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', '\App\Http\Controllers\AuthController@login');
    Route::post('adminLogin', '\App\Http\Controllers\AuthController@adminLogin');
    Route::get('check', '\App\Http\Controllers\AuthController@check');

});


Route::middleware(['auth:api'])->group(function () {
    Route::get('/avatar/get-all-free-avatar', '\App\Http\Controllers\AvatarController@getAllFreeAvatar');
    Route::get('/avatar/get-all-avatar', '\App\Http\Controllers\AvatarController@getAllAvatar');
});



