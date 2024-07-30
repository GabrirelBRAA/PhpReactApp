<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class Faixa extends Model
{
    use HasFactory;

    protected $fillable = ['faixa'];

    public function up(){
        Schema::create('faixa', function(Blueprint $table){
            $table->id();
            $table->string('title');
            $table->foreignIdFor(Album::class);
            //This is in seconds
            $table->integer('length');
        });
    }    
    public static function GetSchema(){
        $columns = Schema::getColumnListing('faixas');
        return  $columns;
       }
}
