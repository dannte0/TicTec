<?php

namespace App\Http\Controllers;

use App\Models\Atraso;
use Carbon\Carbon;
use Error;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AtrasoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() :JsonResponse
    {
        $atrasos = DB::table('tbAtraso')
            ->join('tbModulo', 'tbAtraso.idModulo', 'tbModulo.idModulo')
            ->join('tbPeriodo', 'tbAtraso.idPeriodo', 'tbPeriodo.idPeriodo')
            ->join('tbCurso', 'tbAtraso.idCurso', 'tbCurso.idCurso')
            ->select('tbAtraso.*', 'periodo as nomePeriodo', 'modulo as nomeModulo', 'curso as nomeCurso')
            ->get();
    
            return response()->json($atrasos);
    }
    

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $atraso = new Atraso;

            $request->validate([
                'nomeAluno' => 'required|string|max:255',
                'idPeriodo' => 'required|integer',
                'idModulo' => 'required|integer',
                'idCurso' => 'required|integer',
            ]);
    
            $atraso->dataAtraso = Carbon::now('America/Sao_Paulo');
            $atraso->horarioAtraso = Carbon::now('America/Sao_Paulo');
            $atraso->nomeAluno = $request->nomeAluno;
            $atraso->idPeriodo = $request->idPeriodo;
            $atraso->idModulo = $request->idModulo;
            $atraso->idCurso = $request->idCurso;
    
            $atraso->save();
    
            // Atraso::create($request->all());
            return response()->json(['message'=>'Aluno registrado com sucesso!'], 200);

        }catch(Error $e){
            return response()->$e;
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $atraso = Atraso::where('idAtraso', $id)->get();

        return $atraso;    
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Encontrar o modelo pelo ID ou retornar um erro 404 se não encontrado
        $atraso = Atraso::findOrFail($id);
    
        // Validar os dados recebidos
        $request->validate([
            'dataAtraso' => 'required|date',
            'horarioAtraso' => 'required|date_format:H:i:s', // Ajustado para incluir segundos
            'nomeAluno' => 'required|string|max:255',
            'idPeriodo' => 'required|integer',
            'idModulo' => 'required|integer',
            'idCurso' => 'required|integer',
        ]);
    
        // Atualizar os campos do modelo
        $atraso->dataAtraso = $request->input('dataAtraso');
        $atraso->horarioAtraso = $request->input('horarioAtraso');
        $atraso->nomeAluno = $request->input('nomeAluno');
        $atraso->idPeriodo = $request->input('idPeriodo');
        $atraso->idModulo = $request->input('idModulo');
        $atraso->idCurso = $request->input('idCurso');
    
        // Salvar as mudanças
        $atraso->save();
    
        // Retornar uma resposta JSON
        return response()->json([
            'msg' => 'Registro atualizado com sucesso!',
            'data' => $atraso
        ], 200);
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
