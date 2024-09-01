<?php

use App\Models\Curso;
use App\Models\Modulo;
use App\Models\Periodo;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $curso = Curso::all();
    $periodo = Periodo::all();
    $modulo = Modulo::all();
    return view('welcome', ['curso' => $curso, 'periodo' => $periodo, 'modulo' =>$modulo]);
});
