<?php

namespace App\Models;

use App\Models\Stock;
use Illuminate\Database\Eloquent\Model;

class StockMovement extends Model
{
    protected $fillable = [
        'stock_id',
        'status',
        'quantity',
    ];

    public function stock()
    {
        return $this->belongsTo(Stock::class);
    }
}
