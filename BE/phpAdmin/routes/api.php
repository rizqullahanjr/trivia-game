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

header('Access-Control-Allow-Origin: *');
//Access-Control-Allow-Origin: *
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');



Route::middleware(['auth:api'])->group(function () {
    // Player
    Route::get('/players', '\App\Http\Controllers\PlayerController@findall');
    Route::get('/player', '\App\Http\Controllers\PlayerController@findbyid');
    Route::put('/player/add-diamond/{id}', '\App\Http\Controllers\PlayerController@addDiamond');
    Route::put('/player/reduce-diamond/{id}', '\App\Http\Controllers\PlayerController@reduceDiamond');
    Route::put('/player/update-score/{id}', '\App\Http\Controllers\PlayerController@updateScore');
    Route::put('/player/update-avatar/{id}', '\App\Http\Controllers\PlayerController@updateAvatar');

});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', '\App\Http\Controllers\AuthController@login');
    Route::post('adminLogin', '\App\Http\Controllers\AuthController@adminLogin');
    Route::get('check', '\App\Http\Controllers\AuthController@check');
});


