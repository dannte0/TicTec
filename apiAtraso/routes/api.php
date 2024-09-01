<?php

use App\Http\Controllers\AtrasoController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\ModuloController;
use App\Http\Controllers\PeriodoController;
use App\Models\Atraso;
use App\Models\Curso;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//GET INDEX
Route::get('/periodo', [PeriodoController::class, 'index']);
Route::get('/curso', [CursoController::class, 'index']);
Route::get('/modulo', [ModuloController::class, 'index']);
Route::get('/atraso', [AtrasoController::class, 'index']);

//GET SHOW
Route::get('/curso/{idCurso}', [CursoController::class, 'show']);
Route::get('/atraso/{idAtraso}', [AtrasoController::class, 'show']);


//POST STORE
Route::post('/atraso', [AtrasoController::class, 'store']);

//PUT UPDATE
Route::put('/atraso/{idAtraso}', [AtrasoController::class, 'update']);
