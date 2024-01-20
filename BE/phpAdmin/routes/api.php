<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizController;

// Quiz Routes
Route::group([
    'middleware' => 'api',
    'prefix' => 'quiz'
], function () {
    Route::get('/', [QuizController::class, 'findAll']);
    Route::get('/{id}', [QuizController::class, 'findById']);
    Route::post('/add', [QuizController::class, 'add']);
    Route::put('/{id}', [QuizController::class, 'update']);
    Route::delete('/{id}', [QuizController::class, 'delete']);
});

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
    Route::get('/player/{id}', '\App\Http\Controllers\PlayerController@findByIdAdmin');
    Route::put('player/{id}/reset-score', '\App\Http\Controllers\PlayerController@resetScore');
    // Quiz

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



