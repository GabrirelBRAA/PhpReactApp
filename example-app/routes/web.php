<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppController;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/albums', [AppController::class, 'indexAlbum']);
Route::post('/albums', [AppController::class, 'storeAlbum']);
Route::put('/albums/{id}', [AppController::class, 'updateAlbum']);
Route::get('/albums/schema', [AppController::class, 'getAlbumSchema']);
Route::delete('/albums/{id}', [AppController::class, 'deleteAlbum']);

Route::get('/faixas/schema', [AppController::class, 'getFaixaSchema']);
Route::get('/faixas', [AppController::class, 'indexFaixa']);
Route::post('/faixas', [AppController::class, 'storeFaixa']);
Route::delete('/faixas/{id}', [AppController::class, 'deleteFaixa']);


Route::get('/search', [AppController::class, 'searchQuery']);

Route::get('albumsfaixas', [AppController::class, 'getAlbumsWithFaixas']);
