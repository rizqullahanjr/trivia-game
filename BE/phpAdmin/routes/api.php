<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\AvatarController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\AuthController;

// Quiz routes
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

// Avatar routes
Route::group([
    'middleware' => 'api',
    'prefix' => 'avatar'
], function () {
    Route::get('/', [AvatarController::class, 'findAll']);
    Route::get('/free', [AvatarController::class, 'findAllFree']);
    Route::get('/{id}', [AvatarController::class, 'findById']);
    Route::post('/add', [AvatarController::class, 'add']);
    Route::post('/{id}', [AvatarController::class, 'update']); // somehow cannot use put/patch
    Route::delete('/{id}', [AvatarController::class, 'delete']);
});

// Player routes for admin panel
Route::group([
    'middleware' => 'api',
    'prefix' => 'player'
], function () {
    Route::get('/all', [PlayerController::class, 'findAll']);
    Route::get('{id}', [PlayerController::class, 'findByIdAdmin']);
    Route::put('{id}/reset-score', [PlayerController::class, 'resetScore']);
});

// Player routes for gameplay
Route::group([
    'middleware' => 'api',
    'prefix' => 'player'
], function () {
    Route::get('/', [PlayerController::class, 'findById']);
    Route::post('/register', [PlayerController::class, 'register']);
    Route::put('/add-diamond', [PlayerController::class, 'addDiamond']);
    Route::put('/reduce-diamond', [PlayerController::class, 'reduceDiamond']);
    Route::put('/update-score', [PlayerController::class, 'updateScore']);
    Route::put('/update-avatar', [PlayerController::class, 'updateAvatar']);
    Route::post('/buy-avatar', [PlayerController::class, 'buyAvatar']);
});

// Auth routes
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('adminLogin', [AuthController::class, 'adminLogin']);
    Route::get('check', '\App\Http\Controllers\AuthController@check');

});




