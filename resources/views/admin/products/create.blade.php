<!-- Main modal -->
<div id="crud-modal" tabindex="-1" aria-hidden="true"
    class="hidden fixed inset-0 z-50 items-center justify-center overflow-y-auto bg-black/40 p-4">

    <div class="relative w-full max-w-lg">

        <form id="create-product-form" enctype="multipart/form-data" class="space-y-6">

            @csrf

            <!-- Modal content -->
            <div class="relative overflow-hidden rounded-xl bg-gray-800 shadow-xl">

                <!-- Modal header -->
                <div class="flex items-start justify-between border-b border-gray-200 px-6 py-5">

                    <div>
                        <h3 class="text-xl font-semibold text-white">
                            Add New Product
                        </h3>

                        <p class="mt-1 text-sm text-gray-500">
                            Add product information to your inventory.
                        </p>
                    </div>

                    <button id="btn-close-modal" type="button"
                        class="ml-4 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-gray-200">

                        <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24">

                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>

                        <span class="sr-only">
                            Close modal
                        </span>
                    </button>

                </div>

                <!-- Modal body -->
                <div class="grid grid-cols-1 gap-5 px-6 py-6 sm:grid-cols-2">

                    <!-- Product name -->
                    <div>

                        <label for="name" class="mb-2 block text-sm font-medium text-white">
                            Product Name
                        </label>

                        <input type="text" name="name" id="name"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-black placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            placeholder="Enter product name" required>

                    </div>

                    <div>

                        <label for="stock" class="mb-2 block text-sm font-medium text-white">
                            Stock
                        </label>

                        <input type="text" name="name" id="name"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-black placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            placeholder="Enter product stock" required>

                    </div>

                    <!-- Price -->
                    <div>

                        <label for="price" class="mb-2 block text-sm font-medium text-white">
                            Price
                        </label>

                        <input type="number" name="price" id="price"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-black placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            placeholder="Rp. 500.000" required>

                    </div>

                    <!-- Size -->
                    <div>

                        <label for="size" class="mb-2 block text-sm font-medium text-white">
                            Size
                        </label>

                        <select id="size" name="size"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">

                            <option value="" selected disabled>
                                Select Size
                            </option>

                            <option value="TV">
                                Small
                            </option>

                            <option value="PC">
                                Medium
                            </option>

                            <option value="GA">
                                Large
                            </option>

                            <option value="PH">
                                Extra Large
                            </option>

                        </select>

                    </div>

                    <!-- Description -->
                    <div class="sm:col-span-2">

                        <label for="description" class="mb-2 block text-sm font-medium text-white">
                            Product Description
                        </label>

                        <textarea id="description" name="description" rows="4"
                            class="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-black placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            placeholder="Write a short description about this product..."></textarea>

                    </div>

                </div>

                <!-- Footer -->
                <div class="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-5">

                    <button id="btn-cancel-modal" type="button"
                        class="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100">
                        Cancel
                    </button>

                    <button type="submit"
                        class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">

                        <svg class="mr-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24">

                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 12h14m-7 7V5" />
                        </svg>

                        Add Product
                    </button>

                </div>

            </div>
        </form>

    </div>
</div>
