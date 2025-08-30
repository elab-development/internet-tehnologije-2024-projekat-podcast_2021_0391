<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PodcastController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EpisodeController;
use App\Http\Controllers\UserController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {

    Route::get('/podcasts',[PodcastController::class,'index']);
    Route::post('/podcasts',[PodcastController::class,'store']);
    Route::get('/podcasts/{id}',[PodcastController::class,'show']);
    Route::delete('/podcasts/{id}',[PodcastController::class,'destroy']);


    Route::post('/episodes',[EpisodeController::class,'store']);
    Route::get('/episodes/file/{id}', [EpisodeController::class, 'getFile'])->name('episode.file');
    Route::get('/episodes/{id}', [EpisodeController::class, 'show']);

    Route::get('/categories',[CategoryController::class,'index']);
    Route::post('/categories',[CategoryController::class,'store']);
    Route::delete('/categories/{id}',[CategoryController::class,'destroy']);


    Route::get('/users',[UserController::class,'index']);
    Route::get('users/creators',[UserController::class,'creators']);
    Route::get('/users/my-podcasts',[UserController::class,'creatorPodcasts']);
    Route::get('/users/{id}',[UserController::class,'show']);
    Route::delete('/users/{id}',[UserController::class,'destroy']);
    Route::put('/users',[UserController::class,'updateProfilePicture']);
});