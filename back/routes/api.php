<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PodcastController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EpisodeController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {

    Route::get('/podcasts',[PodcastController::class,'index']);
    Route::post('/podcasts',[PodcastController::class,'store']);
    Route::get('/podcasts/{id}',[PodcastController::class,'show']);
    Route::delete('/podcasts/{id}',[PodcastController::class,'destroy']);


    Route::post('/episodes',[EpisodeController::class,'store']);


    Route::get('/categories',[CategoryController::class,'index']);
    Route::post('/categories',[CategoryController::class,'store']);
    Route::delete('/categories/{id}',[CategoryController::class,'destroy']);
});