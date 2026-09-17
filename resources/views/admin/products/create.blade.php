<div id="crud-modal" tabindex="-1" aria-hidden="true"
    class="hidden fixed inset-0 z-50 items-center justify-center overflow-y-auto bg-black/40 p-4">

    <div class="relative w-full max-w-lg">

        <form id="create-product-form" class="space-y-6">

            @csrf

            <div class="relative overflow-hidden rounded-xl bg-gray-800 shadow-xl">

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
                        class="ml-4 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-red-500">

                        ✕

                    </button>

                </div>

                <div class="grid grid-cols-1 gap-5 px-6 py-6 sm:grid-cols-2">

                    <div class="sm:col-span-2">

                        <label for="create-name" class="mb-2 block text-sm font-medium text-white">
                            Product Name
                        </label>

                        <input type="text" name="name" id="create-name"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-black"
                            placeholder="Enter product name" required>

                    </div>

                    <div>

                        <label for="create-price" class="mb-2 block text-sm font-medium text-white">
                            Price
                        </label>

                        <input type="number" name="price" id="create-price"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-black"
                            placeholder="500000" required>

                    </div>

                    <div>

                        <label for="create-size" class="mb-2 block text-sm font-medium text-white">
                            Size
                        </label>

                        <select id="create-size" name="size"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-black"
                            required>

                            <option value="" selected disabled>
                                Select Size
                            </option>

                            <option value="Small">
                                Small
                            </option>

                            <option value="Medium">
                                Medium
                            </option>

                            <option value="Large">
                                Large
                            </option>

                            <option value="Extra Large">
                                Extra Large
                            </option>

                        </select>

                    </div>

                    <div class="sm:col-span-2">

                        <label for="create-description" class="mb-2 block text-sm font-medium text-white">
                            Product Description
                        </label>

                        <textarea id="create-description" name="description" rows="4"
                            class="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-black"
                            placeholder="Write a short description about this product..." required></textarea>

                    </div>

                </div>

                <div class="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-5">

                    <button id="btn-cancel-modal" type="button"
                        class="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700">
                        Cancel
                    </button>

                    <button type="submit"
                        class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
                        + Add Product
                    </button>

                </div>

            </div>

        </form>

    </div>

</div>
