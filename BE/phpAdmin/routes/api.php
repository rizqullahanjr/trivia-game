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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/google/login/url', '\App\Http\Controllers\api\GoogleController@getAuthUrl');
Route::post('/google/auth/login', '\App\Http\Controllers\api\GoogleController@postLogin');

Route::middleware(['auth:api'])->group(function () {
    Route::get('/google/drive', '\App\Http\Controllers\api\GoogleController@getDrive');
});

Route::middleware(['auth:api'])->group(function () {
    Route::get('/stuff', function (Request $request) {
        return "success";
    });
});

Route::middleware([])->group(function () {
   Route::get('/players', '\App\Http\Controllers\PlayerController@findall');
   Route::get('/player/{id}', '\App\Http\Controllers\PlayerController@findbyid');
   Route::put('/player/add-diamond/{id}', '\App\Http\Controllers\PlayerController@addDiamond');
   Route::put('/player/reduce-diamond/{id}', '\App\Http\Controllers\PlayerController@reduceDiamond');
   Route::put('/player/update-score/{id}', '\App\Http\Controllers\PlayerController@updateScore');
   Route::put('/player/update-avatar/{id}', '\App\Http\Controllers\PlayerController@updateAvatar');

});


