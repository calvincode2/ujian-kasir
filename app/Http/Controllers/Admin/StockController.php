<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StockController extends Controller
{
    public function restock(Request $request, Product $product)
    {
        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
            'status' => ['required', 'in:in_stock,damaged,rejected'],
        ]);

        DB::transaction(function () use ($product, $validated) {
            $stock = $product->stock()->firstOrCreate([], [
                'quantity' => 0
            ]);

            if ($validated['status'] === 'in_stock') {

                $stock->increment('quantity', $validated['quantity']);
            } else {

                if ($stock->quantity < $validated['quantity']) {
                    throw new \Exception('Stok tidak mencukupi.');
                }

                $stock->decrement('quantity', $validated['quantity']);
            }

            $stock->movements()->create([
                'status' => $validated['status'],
                'quantity' => $validated['quantity'],
            ]);
        });

        return response()->json([
            'message' => 'Stock berhasil diperbarui.',
            'data' => [
                'product_id' => $product->id,
                'quantity' => $product->stock()->value('quantity'),
            ],
        ]);
    }
}
