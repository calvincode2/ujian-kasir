<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'Es Teh Manis',
            'price' => 5000,
            'size' => 'Small',
            'description' => 'Es teh manis segar.',
        ]);

        Product::create([
            'name' => 'Kopi Susu',
            'price' => 12000,
            'size' => 'Medium',
            'description' => 'Kopi susu dengan rasa creamy.',
        ]);

        Product::create([
            'name' => 'Matcha Latte',
            'price' => 15000,
            'size' => 'Large',
            'description' => 'Minuman matcha dengan susu segar.',
        ]);

        Product::create([
            'name' => 'Cokelat',
            'price' => 13000,
            'size' => 'Medium',
            'description' => 'Minuman cokelat dengan rasa manis.',
        ]);
    }
}
