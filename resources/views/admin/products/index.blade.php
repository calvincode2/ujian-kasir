<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Product') }}
        </h2>
    </x-slot>
    <div class="py-12" id="parent">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div id="alert-container"></div>
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

                <div class="p-6 text-gray-900 dark:text-gray-100">

                    <!-- Add Product Button -->
                    <button type="button" id="btn-add-product"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium leading-5 text-sm mb-4 transition">
                        Add Product
                    </button>

                    <!-- Product Table -->
                    <form method="GET" action="{{ route('admin.products.index') }}" class="w-full">

                        <div
                            class="w-full overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-lg border border-default">

                            <table class="w-full text-sm text-left rtl:text-right text-body">

                                <!-- Table Header -->
                                <thead
                                    class="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">

                                    <tr>

                                        <th scope="col" class="px-6 py-3 font-medium whitespace-nowrap">
                                            #
                                        </th>

                                        <th scope="col" class="px-6 py-3 font-medium whitespace-nowrap">
                                            Product Name
                                        </th>

                                        <th scope="col" class="px-6 py-3 font-medium whitespace-nowrap">
                                            Size
                                        </th>

                                        <th scope="col" class="px-6 py-3 font-medium whitespace-nowrap">
                                            Price
                                        </th>

                                        <th scope="col" class="px-6 py-3 font-medium">
                                            Description
                                        </th>

                                        <th scope="col" class="px-5 py-3 font-medium text-center whitespace-nowrap">
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <!-- Table Body -->
                                <tbody>

                                    @foreach ($products as $product)
                                        <tr
                                            class="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium transition">

                                            <th scope="row"
                                                class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                                {{ $loop->iteration }}
                                            </th>

                                            <th scope="row"
                                                class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                                {{ $product->name }}
                                            </th>

                                            <td class="px-6 py-4 whitespace-nowrap">
                                                {{ $product->size }}
                                            </td>

                                            <td class="px-6 py-4 whitespace-nowrap">
                                                {{ $product->price }}
                                            </td>

                                            <td class="px-6 py-4">
                                                {{ $product->description }}
                                            </td>

                                            <td class="px-6 py-4 text-right whitespace-nowrap">
                                                <div class="flex justify-end gap-7">
                                                    <button type="button"
                                                        class="btn-edit-product font-medium text-blue-600 hover:underline"
                                                        data-product-id="{{ $product->id }}"
                                                        data-product-name="{{ $product->name }}"
                                                        data-product-price="{{ $product->price }}"
                                                        data-product-size="{{ $product->size }}"
                                                        data-product-description="{{ $product->description }}">
                                                        Edit
                                                    </button>

                                                    <form action="{{ route('admin.products.destroy', $product) }}"
                                                        method="post" class="form-delete-product">
                                                        @csrf
                                                        @method('DELETE')

                                                        <button type="submit"
                                                            class="font-medium text-red-600 hover:underline">
                                                            Delete
                                                        </button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                    @endforeach

                                </tbody>

                            </table>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    </div>

    <!-- Create Product Modal -->
    @include('admin.products.create')
    @include('admin.products.edit')

    @push('scripts')
        <script src="{{ asset('js/product.js') }}"></script>
    @endpush

</x-app-layout>
