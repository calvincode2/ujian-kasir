<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'price',
        'size',
        'description'
    ];

    public function stock()
    {
        return $this->hasOne(Stock::class);
    }
}
