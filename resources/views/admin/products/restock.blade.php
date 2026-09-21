<!-- Restock Modal -->
<div id="restock-modal" tabindex="-1" aria-hidden="true"
    class="hidden fixed inset-0 z-50 items-center justify-center overflow-y-auto bg-black/40 p-4">
    <div class="relative w-full max-w-lg">

        <form id="restock-form" class="space-y-6">

            @csrf

            <div class="relative overflow-hidden rounded-xl bg-gray-800 shadow-xl">

                <!-- Modal Header -->
                <div class="flex items-start justify-between border-b border-gray-200 px-6 py-5">

                    <div>
                        <h3 class="text-xl font-semibold text-white">
                            Restock Product
                        </h3>

                        <p class="mt-1 text-sm text-gray-500">
                            Update product stock information.
                        </p>
                    </div>

                    <button id="btn-close-restock" type="button"
                        class="ml-4 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-red-500">
                        ✕
                    </button>

                </div>

                <!-- Modal Body -->
                <div class="grid grid-cols-1 gap-5 px-6 py-6 sm:grid-cols-2">

                    <!-- Product Name -->
                    <div>
                        <label for="restock-name" class="mb-2 block text-sm font-medium text-white">
                            Product Name
                        </label>

                        <input type="text" id="restock-name" readonly
                            class="block w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-black">

                        <p id="restock-name-error" class="hidden mt-2 text-sm text-red-500"></p>
                    </div>

                    <!-- Size -->
                    <div>
                        <label for="restock-size" class="mb-2 block text-sm font-medium text-white">
                            Size
                        </label>

                        <input type="text" id="restock-size" readonly
                            class="block w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-black">

                        <p id="restock-size-error" class="hidden mt-2 text-sm text-red-500"></p>
                    </div>

                    <!-- Price -->
                    <div>
                        <label for="restock-price" class="mb-2 block text-sm font-medium text-white">
                            Price
                        </label>

                        <input type="number" id="restock-price" readonly
                            class="block w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-black">

                        <p id="restock-price-error" class="hidden mt-2 text-sm text-red-500"></p>
                    </div>

                    <!-- Status -->
                    <div>
                        <label for="restock-status" class="mb-2 block text-sm font-medium text-white">
                            Stock Status
                        </label>

                        <select id="restock-status"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-black">
                            <option value="">
                                Select Status
                            </option>

                            <option value="in_stock">
                                In Stock
                            </option>

                            <option value="damaged">
                                Damaged
                            </option>

                            <option value="rejected">
                                Rejected
                            </option>
                        </select>

                        <p id="restock-status-error" class="hidden mt-2 text-sm text-red-500"></p>
                    </div>

                    <!-- Current Stock -->
                    <div>
                        <label for="restock-current-stock" class="mb-2 block text-sm font-medium text-white">
                            Current Stock
                        </label>

                        <input type="number" id="restock-current-stock" readonly
                            class="block w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-black">
                    </div>

                    <!-- Restock Quantity -->
                    <div>
                        <label for="restock-quantity" class="mb-2 block text-sm font-medium text-white">
                            Restock Quantity
                        </label>

                        <input type="number" id="restock-quantity" min="1" placeholder="Masukkan jumlah"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-black">

                        <p id="restock-quantity-error" class="hidden mt-2 text-sm text-red-500"></p>
                    </div>

                    <!-- Description -->
                    <div class="sm:col-span-2">
                        <label for="restock-description" class="mb-2 block text-sm font-medium text-white">
                            Product Description
                        </label>

                        <textarea id="restock-description" rows="4" readonly
                            class="block w-full resize-none cursor-not-allowed rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-black"></textarea>

                        <p id="restock-description-error" class="hidden mt-2 text-sm text-red-500"></p>
                    </div>

                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-5">

                    <button id="btn-cancel-restock" type="button"
                        class="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700">
                        Cancel
                    </button>

                    <button id="btn-submit-restock" type="submit"
                        class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
                        <svg id="restock-loading" class="hidden mr-2 h-4 w-4 animate-spin" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                stroke-width="4"></circle>

                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>

                        <span id="restock-submit-text">
                            Simpan
                        </span>
                    </button>

                </div>

            </div>

        </form>

    </div>
</div>
