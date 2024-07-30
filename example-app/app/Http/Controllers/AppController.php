<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Album;
use App\Models\Faixa;
use Illuminate\Support\Facades\DB;

class AppController extends Controller
{
    //
    public function indexAlbum(){
        $albums = Album::all();
        return response()->json($albums);
    }

    public function storeAlbum(Request $request){
        $album = Album::create($request->all());
        return response()->json($album, 201);
    }

    public function deleteAlbum($id){
        $id = Album::find($id);
        if($id){
            return $id->delete();
        }
        else return 0;
    }

    public function updateAlbum(Request $request){
        $album = Album::updateAlbum($request->all());
        return response()->json($album);
    }

    public function getAlbumSchema(){
        return Album::GetSchema();
    }

    public function indexFaixa(){
        $faixa = Faixa::all();
        return response()->json($faixa);
    }

    public function storeFaixa(Request $request){
        $faixa = Faixa::create($request->all());
        return response()->json($faixa, 201);
    }

    public function deleteFaixa($id){
        $id = Faixa::find($id);
        if($id){
            return $id->delete();
        }
        else return 0;
    }

    public function updateFaixa(Request $request){
        $faixa = Faixa::updateAlbum($request->all());
        return response()->json($faixa);
    }

    public function getFaixaSchema(){
        return Faixa::GetSchema();
    }

    public function searchQuery(Request $request){
        $query = $request->query("query");
        $albums = Album::where('title', 'like', '%'. $query .'%')->get();
        $faixas = Faixa::where('title', 'like', '%'. $query .'%')->get();
        return $albums->merge($faixas)->all();
    }

    //Talvez seja possível usar uma única query para isso ou no mínimo duas.
    public function getAlbumsWithFaixas(){
        $albums = Album::all();
        foreach($albums as $album){
            $faixas = Faixa::select('*')->where("faixas.album_id", "=", $album->id)->get();
            $album->faixas = $faixas;
        }
        return $albums;
    }
}
