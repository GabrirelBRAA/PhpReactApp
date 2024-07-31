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

    //Uma melhoria seria deixar isso em uma única transação ou habilitar ON DELETE CASCADE no BD.
    public function deleteAlbum($id){
        $album = Album::find($id);
        if($album){
            $faixas = Faixa::select('*')->where("faixas.album_id", "=", $album->id)->get();
            foreach($faixas as $faixa){
                $faixa->delete();
            }
            return $album->delete();
        }
        else return 0;
    }

    public function updateAlbum(Request $request, $id){
        $album = Album::whereId($id)->update($request->all());
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

    /*
    public function updateFaixa(Request $request){
        $faixa = Faixa::update($request->all());
        return response()->json($faixa);
    }
    */

    public function getFaixaSchema(){
        return Faixa::GetSchema();
    }


    //Essa parte definitivamente pode ser otimizada
    //talvez uma única nested query resolva isso
    public function searchQuery(Request $request){
        $query = $request->query("query");
        $albums = Album::where('title', 'like', '%'. $query .'%')->get();

        foreach($albums as $album){
            $albumFaixas = Faixa::select('*')->where("faixas.album_id", "=", $album->id)->get();
            $album->faixas = $albumFaixas;
        }

        $faixas = Faixa::where('title', 'like', '%'. $query .'%')->get();

        foreach($faixas as $faixa){
            $faixa->selected = true;
            $album = Album::whereId($faixa->album_id);
            if(!$album){
                continue;
            }
            $album = $album->first();
            if(!$album){
                continue;
            }

            foreach($albums as $iterAlbum){
                if($iterAlbum->id == $faixa->album_id){
                    foreach($iterAlbum->faixas as $album_faixa){
                        if($album_faixa->id == $faixa->id){
                            $album_faixa->selected = true;
                            break;
                        }                
                    }
                    continue 2;
                }
            }

            $albumFaixas = Faixa::select('*')->where("faixas.album_id", "=", $album->id)
            ->where("faixas.id", "<>", $faixa->id)->get();

            $album->faixas = $albumFaixas;

            $faixa->selected = true;

            $album->faixas->push($faixa);
            $albums->push($album);
        }
        return $albums->all();
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
