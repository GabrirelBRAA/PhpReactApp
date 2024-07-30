<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class Album extends Model
{
    use HasFactory;
    protected $fillable = ['albums'];
    public function up(){
        Schema::create('albums', function(Blueprint $table){
            $table->id();
            $table->string('title');
        });
    }    
    public static function GetSchema(){
        $columns = Schema::getColumnListing("albums");
        return  $columns;
       }
}
