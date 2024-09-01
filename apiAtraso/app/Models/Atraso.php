<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Atraso extends Model
{
    use HasFactory;

    protected $table = "tbAtraso";

    protected $primarykey = "idAtraso";

    public $fillable = [
        'dataAtraso',
        'horarioAtraso',
        'nomeAluno',
        'idPeriodo',
        'idModulo',
        'idCurso'
    ];

    public $timestamps = false;
}
